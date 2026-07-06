import { describe, it, expect } from "vitest";
import {
  PROTEIN_FACTOR_MIN,
  proteinTarget,
  resolveCardText,
  daysSinceLastActivity,
  REENTRY_THRESHOLD_DAYS,
  selectCard,
  isSubscriptionLocked,
} from "./ruleEngine.js";
import { CONTENT_CARDS } from "../data/mockCards.js";

/* ---------- Fixtures ---------- */

const profile = (overrides = {}) => ({
  target_weight_kg: 80,
  location_equipment: "fitnessstudio",
  subscription_status: "trial",
  trial_ends_at: "2026-07-13T10:00:00.000Z",
  ...overrides,
});

const card = (overrides = {}) => ({
  id: "test-card",
  time_tag: "mittel",
  energy_tag: "normal",
  location_tag: "egal",
  is_reentry_card: false,
  ...overrides,
});

// Die generische Fallback-Karte, die §5.2 zwingend voraussetzt.
const FALLBACK = card({ id: "fallback" });

describe("proteinTarget (§5.1)", () => {
  it("berechnet Zielgewicht × 1,6 g", () => {
    expect(proteinTarget(80)).toBe(128);
    expect(proteinTarget(62.5)).toBe(100);
  });

  it("rundet auf ganze Gramm", () => {
    expect(proteinTarget(81.4)).toBe(130); // 130.24
    expect(proteinTarget(81.6)).toBe(131); // 130.56
  });

  it("Faktor liegt nie unter 1,6", () => {
    expect(PROTEIN_FACTOR_MIN).toBeGreaterThanOrEqual(1.6);
  });
});

describe("resolveCardText (§9.1)", () => {
  it("ersetzt {protein_target} — auch mehrfach", () => {
    const text = "Ziel: {protein_target} g. Nochmal: {protein_target} g.";
    expect(resolveCardText(text, profile())).toBe("Ziel: 128 g. Nochmal: 128 g.");
  });

  it("lässt Text ohne Platzhalter unverändert", () => {
    expect(resolveCardText("Kein Platzhalter.", profile())).toBe("Kein Platzhalter.");
  });

  it("reicht null/undefined/leer unverändert durch (optionale Kartenfelder)", () => {
    expect(resolveCardText(null, profile())).toBeNull();
    expect(resolveCardText(undefined, profile())).toBeUndefined();
    expect(resolveCardText("", profile())).toBe("");
  });
});

describe("daysSinceLastActivity (§5.2)", () => {
  const log = (log_date) => ({ log_date });

  it("liefert 0 bei leerer Historie (neuer Nutzer → kein Reentry)", () => {
    expect(daysSinceLastActivity([], "2026-07-06")).toBe(0);
  });

  it("ignoriert den heutigen Log (nur Vergangenheit zählt)", () => {
    expect(daysSinceLastActivity([log("2026-07-06")], "2026-07-06")).toBe(0);
  });

  it("misst den Abstand zum jüngsten vergangenen Log", () => {
    const logs = [log("2026-07-01"), log("2026-07-05"), log("2026-07-03")];
    expect(daysSinceLastActivity(logs, "2026-07-06")).toBe(1);
  });

  it("erreicht die Reentry-Schwelle nach genau 3 Tagen Pause", () => {
    const logs = [log("2026-07-03")];
    expect(daysSinceLastActivity(logs, "2026-07-06")).toBe(REENTRY_THRESHOLD_DAYS);
  });

  it("rechnet über Monatsgrenzen hinweg", () => {
    expect(daysSinceLastActivity([log("2026-06-28")], "2026-07-06")).toBe(8);
  });
});

describe("selectCard (§5.2) — Auswahl", () => {
  it("wählt die exakt passende Karte (Zeit + Energie + Ort + Reentry)", () => {
    const target = card({
      id: "hit",
      time_tag: "lang",
      energy_tag: "gut",
      location_tag: "fitnessstudio",
    });
    const cards = [FALLBACK, target];
    const result = selectCard(cards, profile(), { time: "lang", energy: "gut" }, false);
    expect(result).toEqual({ card: target, isContentGap: false });
  });

  it('akzeptiert Karten mit location_tag "egal" für jeden Ort', () => {
    const anywhere = card({ id: "anywhere", time_tag: "kurz", energy_tag: "niedrig" });
    const result = selectCard(
      [FALLBACK, anywhere],
      profile({ location_equipment: "zuhause_ohne" }),
      { time: "kurz", energy: "niedrig" },
      false
    );
    expect(result.card.id).toBe("anywhere");
    expect(result.isContentGap).toBe(false);
  });

  it('Tie-Break ist deterministisch: spezifischer Ort schlägt "egal"', () => {
    const generic = card({ id: "generic" });
    const specific = card({ id: "specific", location_tag: "fitnessstudio" });
    // "egal"-Karte steht absichtlich vorn — die spezifische muss trotzdem gewinnen.
    const result = selectCard(
      [generic, specific, FALLBACK],
      profile(),
      { time: "mittel", energy: "normal" },
      false
    );
    expect(result.card.id).toBe("specific");
  });

  it("bei mehreren gleich passenden Karten entscheidet die Reihenfolge (first match)", () => {
    const first = card({ id: "first" });
    const second = card({ id: "second" });
    const result = selectCard(
      [first, second],
      profile(),
      { time: "mittel", energy: "normal" },
      false
    );
    expect(result.card.id).toBe("first");
  });

  it("liefert im Reentry-Modus ausschließlich Reentry-Karten", () => {
    const normal = card({ id: "normal" });
    const reentry = card({ id: "reentry", is_reentry_card: true });
    const result = selectCard(
      [normal, reentry, FALLBACK],
      profile(),
      { time: "mittel", energy: "normal" },
      true
    );
    expect(result.card.id).toBe("reentry");
    expect(result.isContentGap).toBe(false);
  });

  it("liefert außerhalb des Reentry-Modus nie eine Reentry-Karte", () => {
    const reentry = card({
      id: "reentry",
      is_reentry_card: true,
      time_tag: "kurz",
      energy_tag: "gut",
    });
    const result = selectCard(
      [reentry, FALLBACK],
      profile(),
      { time: "kurz", energy: "gut" },
      false
    );
    expect(result.card.id).toBe("fallback");
    expect(result.isContentGap).toBe(true);
  });
});

describe("selectCard (§5.2) — Fallback & Content-Lücken", () => {
  it("meldet eine Content-Lücke und liefert die generischste Karte (mittel/normal/egal)", () => {
    const other = card({ id: "other", time_tag: "lang", energy_tag: "gut" });
    const result = selectCard(
      [other, FALLBACK],
      profile(),
      { time: "kurz", energy: "niedrig" },
      false
    );
    expect(result).toEqual({ card: FALLBACK, isContentGap: true });
  });

  it("fällt auch im Reentry-Modus auf die generische Nicht-Reentry-Karte zurück", () => {
    // Dokumentiertes Verhalten: fehlt eine Reentry-Karte für die Kombination,
    // greift der generische Fallback (is_reentry_card=false) + Content-Gap-Log.
    const result = selectCard([FALLBACK], profile(), { time: "kurz", energy: "niedrig" }, true);
    expect(result.card.id).toBe("fallback");
    expect(result.isContentGap).toBe(true);
  });

  it("liefert card=undefined, wenn die vorausgesetzte Fallback-Karte fehlt (Datenfehler)", () => {
    const result = selectCard([], profile(), { time: "kurz", energy: "niedrig" }, false);
    expect(result.card).toBeUndefined();
    expect(result.isContentGap).toBe(true);
  });
});

describe("selectCard — Regression gegen die reale Kartenbibliothek (§7)", () => {
  const cases = [
    // [beschreibung, location, time, energy, reentry, erwartete karte, gap]
    [
      "kurz/niedrig → Spaziergang (ortsunabhängig)",
      "fitnessstudio",
      "kurz",
      "niedrig",
      false,
      "card-01",
      false,
    ],
    [
      "lang/gut im Studio → Ganzkörpertraining",
      "fitnessstudio",
      "lang",
      "gut",
      false,
      "card-02",
      false,
    ],
    [
      "Reentry mittel/normal → Willkommen zurück",
      "zuhause_ohne",
      "mittel",
      "normal",
      true,
      "card-03",
      false,
    ],
    [
      "mittel/normal mit Kurzhanteln schlägt Fallback (Tie-Break)",
      "zuhause_kurzhanteln",
      "mittel",
      "normal",
      false,
      "card-04",
      false,
    ],
    ["kurz/gut ohne Geräte → Eigengewicht", "zuhause_ohne", "kurz", "gut", false, "card-05", false],
    [
      "lang/niedrig → Erholung statt Intensität",
      "zuhause_kurzhanteln",
      "lang",
      "niedrig",
      false,
      "card-06",
      false,
    ],
    [
      "mittel/normal im Studio → Oberkörper-Fokus",
      "fitnessstudio",
      "mittel",
      "normal",
      false,
      "card-07",
      false,
    ],
    [
      "Lücke: lang/gut ohne Geräte → Fallback",
      "zuhause_ohne",
      "lang",
      "gut",
      false,
      "card-fallback",
      true,
    ],
    [
      "Lücke: Reentry kurz/niedrig → Fallback",
      "fitnessstudio",
      "kurz",
      "niedrig",
      true,
      "card-fallback",
      true,
    ],
  ];

  it.each(cases)("%s", (_desc, location, time, energy, reentry, expectedId, expectedGap) => {
    const result = selectCard(
      CONTENT_CARDS,
      profile({ location_equipment: location }),
      { time, energy },
      reentry
    );
    expect(result.card.id).toBe(expectedId);
    expect(result.isContentGap).toBe(expectedGap);
  });

  it("jede der 27 Kombinationen liefert immer eine Karte (nie undefined)", () => {
    for (const time of ["kurz", "mittel", "lang"])
      for (const energy of ["niedrig", "normal", "gut"])
        for (const location of ["zuhause_ohne", "zuhause_kurzhanteln", "fitnessstudio"])
          for (const reentry of [false, true]) {
            const { card: chosen } = selectCard(
              CONTENT_CARDS,
              profile({ location_equipment: location }),
              { time, energy },
              reentry
            );
            expect(chosen).toBeDefined();
          }
  });
});

describe("isSubscriptionLocked (§9.3)", () => {
  const trialEnd = "2026-07-13T10:00:00.000Z";

  it("aktives Abo ist nie gesperrt", () => {
    expect(
      isSubscriptionLocked(profile({ subscription_status: "active" }), new Date("2099-01-01"))
    ).toBe(false);
  });

  it("Trial vor Ablauf ist frei, danach gesperrt", () => {
    const p = profile({ subscription_status: "trial", trial_ends_at: trialEnd });
    expect(isSubscriptionLocked(p, new Date("2026-07-10T00:00:00Z"))).toBe(false);
    expect(isSubscriptionLocked(p, new Date("2026-07-13T10:00:01Z"))).toBe(true);
  });

  it("exakt zum Trial-Ende ist noch frei (Grenzwert: strikt größer)", () => {
    const p = profile({ subscription_status: "trial", trial_ends_at: trialEnd });
    expect(isSubscriptionLocked(p, new Date(trialEnd))).toBe(false);
  });

  it("paused und cancelled sperren die Karte", () => {
    expect(isSubscriptionLocked(profile({ subscription_status: "paused" }), new Date())).toBe(true);
    expect(isSubscriptionLocked(profile({ subscription_status: "cancelled" }), new Date())).toBe(
      true
    );
  });

  it("ohne Profil (noch nicht eingeloggt/onboarded) wird nicht gesperrt", () => {
    expect(isSubscriptionLocked(null, new Date())).toBe(false);
  });
});
