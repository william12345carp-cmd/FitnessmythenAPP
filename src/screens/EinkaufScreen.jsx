/* [Tab] Einkauf — Einkaufsliste (Schritt 4).
   Meine Liste (abhakbar, useState — bewusst kein localStorage für den MVP),
   Vorlagen zum Übernehmen, aufklappbare Lebensmittel-Gruppen und Vergleiche. */

import { useState } from "react";
import { Button } from "../components/ui/Button.jsx";
import { LEBENSMITTEL_GRUPPEN, SITUATIVE_LISTEN, LEBENSMITTEL_VERGLEICHE } from "../data/einkauf.js";

function toListItems(items) {
  return items.map((it) => ({
    key: it.name,
    name: it.name,
    amount: it.menge || it.amount || "",
    checked: false,
  }));
}

function GruppenAccordion({ gruppe }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="fm-accordion">
      <button
        className="fm-accordion__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        type="button"
      >
        <span>
          <span className="fm-accordion__name">
            {gruppe.icon} {gruppe.name}
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
          <p className="fm-small" style={{ marginBottom: 10 }}>
            {gruppe.nutzen}
          </p>
          {gruppe.items.map((item) => (
            <div className="fm-food-row" key={item.name}>
              <div>
                <div className="fm-food-row__name">{item.name}</div>
                <div className="fm-food-row__tipp">{item.tipp}</div>
              </div>
              <span className="fm-food-row__protein">{item.protein}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function VorlagenKachel({ liste, onUebernehmen }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="fm-accordion">
      <button
        className="fm-accordion__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        type="button"
      >
        <span>
          <span className="fm-accordion__name">
            {liste.icon} {liste.titel}
          </span>
          <br />
          <span className="fm-accordion__meta">{liste.beschreibung}</span>
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
          {liste.items.map((item) => (
            <div className="fm-food-row" key={item.name}>
              <div>
                <div className="fm-food-row__name">{item.name}</div>
                <div className="fm-food-row__tipp">{item.warum}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 12 }}>
            <Button variant="ghost" onClick={() => onUebernehmen(liste.items)}>
              In meine Liste übernehmen
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function EinkaufScreen() {
  const [liste, setListe] = useState([]);

  function addItems(items) {
    setListe((prev) => {
      const vorhanden = new Set(prev.map((i) => i.key));
      const neue = toListItems(items).filter((i) => !vorhanden.has(i.key));
      return [...prev, ...neue];
    });
  }

  function generiereListe() {
    const alleItems = LEBENSMITTEL_GRUPPEN.flatMap((g) => g.items);
    addItems(alleItems);
  }

  function toggle(key) {
    setListe((prev) => prev.map((i) => (i.key === key ? { ...i, checked: !i.checked } : i)));
  }

  function leeren() {
    setListe([]);
  }

  return (
    <div className="fm-screen" style={{ paddingTop: 22 }}>
      <span className="fm-eyebrow fm-eyebrow--red">Einkauf</span>
      <h1 className="fm-display fm-display--md" style={{ margin: "10px 0 18px" }}>
        Die richtigen Grundlagen im Wagen.
      </h1>

      {/* --- Meine Liste --- */}
      <div className="fm-section">
        <p className="fm-section__title">Meine Liste</p>
        {liste.length === 0 && (
          <p className="fm-small" style={{ marginBottom: 12 }}>
            Noch leer. Generiere eine Basisliste oder übernimm eine Vorlage weiter unten.
          </p>
        )}
        {liste.map((item) => (
          <label className={`fm-check-item${item.checked ? " fm-check-item--done" : ""}`} key={item.key}>
            <input type="checkbox" checked={item.checked} onChange={() => toggle(item.key)} />
            <span className="fm-check-item__label">{item.name}</span>
            {item.amount && <span className="fm-check-item__amount">{item.amount}</span>}
          </label>
        ))}
        <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
          <Button variant="primary" onClick={generiereListe}>
            Liste generieren
          </Button>
          {liste.length > 0 && (
            <Button variant="ghost" onClick={leeren}>
              Liste leeren
            </Button>
          )}
        </div>
      </div>

      {/* --- Vorlagen --- */}
      <div className="fm-section">
        <p className="fm-section__title">Vorlagen</p>
        {SITUATIVE_LISTEN.map((vorlage) => (
          <VorlagenKachel key={vorlage.id} liste={vorlage} onUebernehmen={addItems} />
        ))}
      </div>

      {/* --- Lebensmittel-Gruppen --- */}
      <div className="fm-section">
        <p className="fm-section__title">Lebensmittel-Gruppen</p>
        {LEBENSMITTEL_GRUPPEN.map((gruppe) => (
          <GruppenAccordion key={gruppe.id} gruppe={gruppe} />
        ))}
      </div>

      {/* --- Vergleiche --- */}
      <div className="fm-section">
        <p className="fm-section__title">Vergleiche</p>
        {LEBENSMITTEL_VERGLEICHE.map((v) => (
          <div className="fm-list-card" key={v.id} style={{ cursor: "default" }}>
            <h2 className="fm-list-card__title">{v.titel}</h2>
            <div className="fm-compare">
              <div className={`fm-compare__col${v.empfehlung.startsWith(v.itemA) ? " fm-compare__col--winner" : ""}`}>
                <div className="fm-compare__name">{v.itemA}</div>
                <span className="fm-compare__stat">Protein: {v.proteinA}</span>
                <span className="fm-compare__stat">Ballaststoffe: {v.ballaststoffeA}</span>
              </div>
              <div className={`fm-compare__col${v.empfehlung.startsWith(v.itemB) ? " fm-compare__col--winner" : ""}`}>
                <div className="fm-compare__name">{v.itemB}</div>
                <span className="fm-compare__stat">Protein: {v.proteinB}</span>
                <span className="fm-compare__stat">Ballaststoffe: {v.ballaststoffeB}</span>
              </div>
            </div>
            <p className="fm-list-card__preview" style={{ WebkitLineClamp: "unset" }}>
              {v.fazit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
