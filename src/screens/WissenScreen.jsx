/* [Tab] Wissen — Wissensplattform (Schritt 2).
   Suche + Kategorie-Filter über eine flache Liste, Detailansicht per useState
   (kein Routing). Jeder Artikel endet auf genau einer hervorgehobenen Handlung. */

import { useMemo, useState } from "react";
import { ARTIKEL, KATEGORIEN } from "../data/artikel.js";

function ArticleDetail({ artikel, onBack }) {
  return (
    <div className="fm-screen" style={{ paddingTop: 22 }}>
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

        <h1 className="fm-card__title">{artikel.titel}</h1>
        <p className="fm-card__detail">{artikel.kurzantwort}</p>

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
