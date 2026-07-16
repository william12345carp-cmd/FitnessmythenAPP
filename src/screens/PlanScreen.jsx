/* [Tab] Plan — Wochenplan (Schritt 3).
   "Was mache ich heute?" — kein Kalender, keine Komplexität. Trainingstage
   werden gleichmäßig über die Woche verteilt, das heutige Workout kommt aus
   plaene.js/uebungen.js, gefiltert nach dem vorhandenen Equipment im Profil. */

import { useMemo, useState } from "react";
import { useApp } from "../store/appStore.jsx";
import { proteinTarget } from "../lib/ruleEngine.js";
import { PLAN_TYPEN, getOptimalerPlan, filterUebungenNachEquipment } from "../data/plaene.js";
import { UEBUNGEN } from "../data/uebungen.js";
import { LOCATIONS } from "../data/options.js";

const WOCHENTAGE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

// Verteilt die Trainingstage des Plans gleichmäßig mit Erholung dazwischen.
function buildWeekMap(anzahlTage) {
  if (anzahlTage <= 2) return [0, null, null, 1, null, null, null];
  if (anzahlTage === 3) return [0, null, 1, null, 2, null, null];
  return [0, 1, null, 2, 3, null, null];
}

function heutigerWochentagIndex() {
  const jsDay = new Date().getDay(); // 0 = So
  return jsDay === 0 ? 6 : jsDay - 1;
}

function ExerciseAccordion({ eintrag, uebung }) {
  const [open, setOpen] = useState(false);
  if (!uebung) return null;

  return (
    <div className="fm-accordion">
      <button
        className="fm-accordion__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        type="button"
      >
        <span>
          <span className="fm-accordion__name">{uebung.name}</span>
          <br />
          <span className="fm-accordion__meta">
            {eintrag.saetze} × {eintrag.wdh} · Pause {eintrag.pause}
          </span>
        </span>
        <svg
          className={`fm-accordion__chevron${open ? " fm-accordion__chevron--open" : ""}`}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="fm-accordion__panel">
          <ol className="fm-steplist">
            {uebung.ausfuehrung.map((schritt, i) => (
              <li className="fm-step" key={i}>
                <span className="fm-step__detail">{schritt}</span>
              </li>
            ))}
          </ol>
          {uebung.typischeFehler?.length > 0 && (
            <ul className="fm-fehler-list" style={{ marginTop: 4 }}>
              {uebung.typischeFehler.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          )}
          <p className="fm-small" style={{ marginTop: 8 }}>
            <strong style={{ color: "var(--ink)" }}>Progression:</strong> {uebung.progression}
          </p>
        </div>
      )}
    </div>
  );
}

export function PlanScreen() {
  const { state } = useApp();
  const profile = state.profile;

  const planKey = getOptimalerPlan(profile);
  const plan = PLAN_TYPEN[planKey];
  const weekMap = useMemo(() => buildWeekMap(plan.tage.length), [plan.tage.length]);
  const heuteIdx = heutigerWochentagIndex();
  const heutigerTagIndex = weekMap[heuteIdx];
  const heutigerTag = heutigerTagIndex !== null ? plan.tage[heutigerTagIndex] : null;

  const proteinG = proteinTarget(profile.target_weight_kg);
  const locationLabel = LOCATIONS.find((l) => l.value === profile.location_equipment)?.label;
  const trainingstageZahl = weekMap.filter((v) => v !== null).length;

  const gefilterteUebungen = useMemo(() => {
    if (!heutigerTag) return [];
    return heutigerTag.uebungen
      .map((eintrag) => ({ eintrag, uebung: UEBUNGEN.find((u) => u.id === eintrag.uebungId) }))
      .filter(({ uebung }) => uebung && filterUebungenNachEquipment([uebung], profile.location_equipment).length > 0);
  }, [heutigerTag, profile.location_equipment]);

  return (
    <div className="fm-screen" style={{ paddingTop: 22 }}>
      <span className="fm-eyebrow fm-eyebrow--red">Plan</span>
      <h1 className="fm-display fm-display--md" style={{ margin: "10px 0 18px" }}>
        Deine Woche auf einen Blick.
      </h1>

      {/* --- Ziel-Zusammenfassung --- */}
      <div className="fm-section">
        <p className="fm-section__title">Dein Rahmen</p>
        <div className="fm-protein" role="note" style={{ marginBottom: 10 }}>
          <span className="fm-protein__label">Protein-Ziel heute</span>
          <span className="fm-protein__value">{proteinG} g</span>
        </div>
        <div className="fm-row">
          <span className="fm-row__label">Trainingstage / Woche</span>
          <span className="fm-row__value">{trainingstageZahl}</span>
        </div>
        <div className="fm-row" style={{ borderBottom: "none" }}>
          <span className="fm-row__label">Ort &amp; Equipment</span>
          <span className="fm-row__value">{locationLabel}</span>
        </div>
      </div>

      {/* --- Diese Woche --- */}
      <div className="fm-week-row">
        {WOCHENTAGE.map((tag, i) => (
          <div
            key={tag}
            className={`fm-week-day${weekMap[i] !== null ? " fm-week-day--training" : ""}${
              i === heuteIdx ? " fm-week-day--today" : ""
            }`}
          >
            <span className="fm-week-day__label">{tag}</span>
            {weekMap[i] !== null && <span className="fm-week-day__dot" />}
          </div>
        ))}
      </div>

      {/* --- Heutiges Workout --- */}
      <div className="fm-section">
        <p className="fm-section__title">{heutigerTag ? `Heute: ${heutigerTag.name}` : "Heute"}</p>
        {!heutigerTag && (
          <p className="fm-body">
            Heute ist Erholungstag. Kein Training nötig — dein Körper baut sich gerade auf.
          </p>
        )}
        {heutigerTag &&
          gefilterteUebungen.map(({ eintrag, uebung }) => (
            <ExerciseAccordion key={eintrag.uebungId} eintrag={eintrag} uebung={uebung} />
          ))}
      </div>
    </div>
  );
}
