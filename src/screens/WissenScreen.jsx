/* [Tab] Wissen — Wissensplattform (Schritt 2 + KI-Coach).
   Suche + Kategorie-Filter über eine flache Liste, Detailansicht per useState
   (kein Routing). Jeder Artikel endet auf genau einer hervorgehobenen Handlung.

   KI-Coach (oben, vor der Suche): Stufe 1 matcht lokal gegen ARTIKEL (kostenlos,
   sofort). Nur wenn kein Artikel passt, ruft Stufe 2 die Edge Function ai-coach
   auf (Gemini serverseitig — der Key bleibt bewusst außerhalb des Frontend-
   Bundles, siehe supabase/functions/ai-coach). Stufe 3 (Personalisierung) kommt
   aus dem bereits geladenen Profil im App-Store, kein separater Fetch nötig. */

import { useEffect, useMemo, useRef, useState } from "react";
import { useApp } from "../store/appStore.jsx";
import { aiCoachService } from "../services/aiCoachService.js";
import { ARTIKEL, KATEGORIEN } from "../data/artikel.js";

const SCHNELLFRAGEN = [
  "Wie viel Protein brauche ich?",
  "Warum nehme ich nicht ab?",
  "Wie oft trainieren pro Woche?",
  "Was tun bei Heißhunger?",
  "Ist Intervallfasten sinnvoll?",
  "Home Workout für Anfänger",
  "Wie verbessere ich meinen Schlaf?",
];

// Häufige Füllwörter ausschließen — sonst matcht z.B. "über"/"einen" fast jeden
// Artikel, weil diese Wörter (>3 Zeichen) in nahezu jedem Fließtext vorkommen.
const FUELLWOERTER = new Set([
  "über", "einen", "eine", "einem", "einer", "eines", "wird", "kann", "sind",
  "sein", "dass", "nicht", "auch", "mehr", "sehr", "dein", "deine", "deinen",
  "deiner", "jede", "jeden", "jeder", "oder", "aber", "wenn", "wie", "was",
  "wer", "wo", "warum", "dann", "noch", "beim", "vom", "zum", "zur", "diese",
  "dieser", "dieses", "hast", "habe", "haben", "wirklich", "immer", "damit",
]);

// Stufe 1: lokales Keyword-Matching gegen die Wissensbasis — kostenlos, sofort,
// kein API-Call. Nur bei eindeutigem Treffer (score >= 2) wird der Artikel
// gezeigt; sonst übernimmt Stufe 2 (KI) die Frage.
function findePassendenArtikel(frage, artikel) {
  const fragenLower = frage.toLowerCase();
  const woerter = fragenLower.split(/\s+/).filter((w) => w.length > 3 && !FUELLWOERTER.has(w));
  if (woerter.length === 0) return null;

  let bester = null;
  let besterScore = 0;
  for (const a of artikel) {
    const suchfelder = [a.titel, a.kurzantwort, a.kategorie, ...(a.schritte || []), ...(a.typischeFehler || [])]
      .join(" ")
      .toLowerCase();
    let score = 0;
    for (const wort of woerter) {
      if (suchfelder.includes(wort)) score += 1;
    }
    if (score > besterScore) {
      besterScore = score;
      bester = a;
    }
  }
  return besterScore >= 2 ? bester : null;
}

function CoachBox({ profil, onOpenArtikel }) {
  const [eingabe, setEingabe] = useState("");
  const [laedt, setLaedt] = useState(false);
  const [antwort, setAntwort] = useState(null); // { typ: "artikel"|"ki"|"mock"|"error", ... }

  async function handleFrage(frage) {
    const text = frage.trim();
    if (!text || laedt) return;
    setEingabe(text);

    const treffer = findePassendenArtikel(text, ARTIKEL);
    if (treffer) {
      setAntwort({ typ: "artikel", artikel: treffer });
      return;
    }

    setLaedt(true);
    setAntwort(null);
    const result = await aiCoachService.frageStellen(text, profil);
    setLaedt(false);
    if (result.ok) {
      setAntwort({ typ: "ki", text: result.antwort });
    } else {
      setAntwort({ typ: result.reason === "mock" ? "mock" : "error" });
    }
  }

  return (
    <div className="fm-coach">
      <div className="fm-coach__header">
        <span className="fm-coach__icon" aria-hidden="true">
          💬
        </span>
        <div>
          <p className="fm-coach__title">Dein Coach</p>
          <p className="fm-coach__subtitle">Stell mir jede Frage zu Fitness &amp; Ernährung</p>
        </div>
      </div>

      <div className="fm-filter-row" aria-label="Schnellfragen">
        {SCHNELLFRAGEN.map((frage) => (
          <button key={frage} className="fm-filter-chip" onClick={() => handleFrage(frage)} type="button">
            {frage}
          </button>
        ))}
      </div>

      <div className="fm-coach-input-row">
        <input
          className="fm-input"
          placeholder="z. B. Wie viel Protein brauche ich?"
          value={eingabe}
          onChange={(e) => setEingabe(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleFrage(eingabe)}
          aria-label="Frage an den Coach"
        />
        <button
          className="fm-coach-send"
          onClick={() => handleFrage(eingabe)}
          disabled={laedt || !eingabe.trim()}
          aria-label="Frage senden"
          type="button"
        >
          →
        </button>
      </div>

      {laedt && <p className="fm-coach-loading">Coach denkt nach …</p>}

      {antwort?.typ === "artikel" && (
        <button className="fm-coach-antwort fm-coach-antwort--artikel" onClick={() => onOpenArtikel(antwort.artikel.id)} type="button">
          <span aria-hidden="true">{antwort.artikel.emoji}</span>{" "}
          <span className="fm-eyebrow fm-eyebrow--red" style={{ fontSize: 10 }}>
            {antwort.artikel.kategorie}
          </span>
          <p className="fm-list-card__title" style={{ margin: "6px 0" }}>
            {antwort.artikel.titel}
          </p>
          <p className="fm-list-card__preview">{antwort.artikel.kurzantwort}</p>
          <span className="fm-textlink" style={{ display: "inline-block", marginTop: 8 }}>
            Mehr lesen →
          </span>
        </button>
      )}

      {antwort?.typ === "ki" && (
        <div className="fm-coach-antwort">
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: "var(--ink)" }}>{antwort.text}</p>
          <span className="fm-coach-antwort__disclaimer">
            KI-Antwort · Kein Ersatz für ärztliche Beratung. Bei gesundheitlichen Beschwerden bitte einen Arzt
            aufsuchen.
          </span>
        </div>
      )}

      {antwort?.typ === "mock" && (
        <div className="fm-note" role="status">
          Der KI-Coach ist im Demo-Modus (ohne Supabase) nicht verfügbar. Durchsuch die Artikel unten oder probier
          eine der Schnellfragen.
        </div>
      )}

      {antwort?.typ === "error" && (
        <div className="fm-note" role="alert">
          Der Coach konnte gerade nicht antworten. Versuch es gleich nochmal.
        </div>
      )}
    </div>
  );
}

function ArticleDetail({ artikel, onBack }) {
  const topRef = useRef(null);
  useEffect(() => {
    topRef.current?.scrollIntoView({ block: "start" });
  }, []);

  return (
    <div className="fm-screen" style={{ paddingTop: 22 }} ref={topRef}>
      <button className="fm-back" onClick={onBack} type="button">
        ← Zurück
      </button>

      <div className="fm-card">
        <div className="fm-card__folio">
          <span className="fm-eyebrow fm-eyebrow--red">{artikel.kategorie}</span>
          <span className="fm-eyebrow" style={{ color: "var(--ink-faint)" }}>
            {artikel.lesezeit}
          </span>
        </div>

        <span className="fm-list-card__emoji" aria-hidden="true">
          {artikel.emoji}
        </span>
        <h1 className="fm-card__title">{artikel.titel}</h1>
        <p className="fm-card__detail">{artikel.kurzantwort}</p>

        {artikel.mythos && (
          <div className="fm-mythos-box">
            <p className="fm-mythos-box__zeile">
              <span className="fm-mythos-box__label">Mythos</span>
              {artikel.mythos.behauptung}
            </p>
            <p className="fm-mythos-box__zeile fm-mythos-box__zeile--wahrheit">
              <span className="fm-mythos-box__label fm-mythos-box__label--wahrheit">Wahrheit</span>
              {artikel.mythos.wahrheit}
            </p>
          </div>
        )}

        <p className="fm-card__reason">
          <span className="fm-card__reason-label">Warum wichtig</span>
          {artikel.warumWichtig}
        </p>

        <p className="fm-card__detail">{artikel.erklaerung}</p>

        <div className="fm-tip">{artikel.wissenschaft}</div>

        {artikel.schritte?.length > 0 && (
          <ol className="fm-steplist">
            {artikel.schritte.map((schritt, i) => (
              <li className="fm-step" key={i}>
                <span className="fm-step__detail">{schritt}</span>
              </li>
            ))}
          </ol>
        )}

        {artikel.typischeFehler?.length > 0 && (
          <>
            <p className="fm-card__reason-label" style={{ marginBottom: 8 }}>
              Typische Fehler
            </p>
            <ul className="fm-fehler-list">
              {artikel.typischeFehler.map((fehler, i) => (
                <li key={i}>{fehler}</li>
              ))}
            </ul>
          </>
        )}

        <div className="fm-aktion-box">
          <span className="fm-aktion-box__label">Deine Handlung heute</span>
          <span className="fm-aktion-box__text">{artikel.aktion}</span>
        </div>

        {artikel.quellen?.length > 0 && (
          <ul className="fm-quellen">
            {artikel.quellen.map((quelle, i) => (
              <li key={i}>{quelle}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function WissenScreen() {
  const { state } = useApp();
  const [query, setQuery] = useState("");
  const [kategorie, setKategorie] = useState("Alle");
  const [openId, setOpenId] = useState(null);

  const gefiltert = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTIKEL.filter((a) => {
      const matchesKategorie = kategorie === "Alle" || a.kategorie === kategorie;
      const matchesQuery =
        !q ||
        a.titel.toLowerCase().includes(q) ||
        a.kurzantwort.toLowerCase().includes(q) ||
        a.kategorie.toLowerCase().includes(q);
      return matchesKategorie && matchesQuery;
    });
  }, [query, kategorie]);

  const offen = openId ? ARTIKEL.find((a) => a.id === openId) : null;

  if (offen) {
    return <ArticleDetail artikel={offen} onBack={() => setOpenId(null)} />;
  }

  return (
    <div className="fm-screen" style={{ paddingTop: 22 }}>
      <span className="fm-eyebrow fm-eyebrow--red">Wissen</span>
      <h1 className="fm-display fm-display--md" style={{ margin: "10px 0 18px" }}>
        Verstehen, was wirklich zählt.
      </h1>

      <CoachBox profil={state.profile} onOpenArtikel={setOpenId} />

      <div className="fm-field" style={{ marginBottom: 16 }}>
        <input
          className="fm-input"
          type="search"
          placeholder="Thema suchen …"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Wissensartikel durchsuchen"
        />
      </div>

      <div className="fm-filter-row" role="group" aria-label="Nach Kategorie filtern">
        {KATEGORIEN.map((k) => (
          <button
            key={k}
            className="fm-filter-chip"
            aria-pressed={kategorie === k}
            onClick={() => setKategorie(k)}
            type="button"
          >
            {k}
          </button>
        ))}
      </div>

      {gefiltert.length === 0 && (
        <p className="fm-small" style={{ marginTop: 24 }}>
          Kein Artikel gefunden. Versuch einen anderen Suchbegriff.
        </p>
      )}

      {gefiltert.map((a) => (
        <button className="fm-list-card" key={a.id} onClick={() => setOpenId(a.id)} type="button">
          <span className="fm-list-card__emoji" aria-hidden="true">
            {a.emoji}
          </span>
          <div className="fm-list-card__meta">
            <span className="fm-eyebrow fm-eyebrow--red" style={{ fontSize: 10 }}>
              {a.kategorie}
            </span>
            <span className="fm-small" style={{ margin: 0 }}>
              {a.lesezeit}
            </span>
          </div>
          <h2 className="fm-list-card__title">{a.titel}</h2>
          <p className="fm-list-card__preview">{a.kurzantwort}</p>
        </button>
      ))}
    </div>
  );
}
