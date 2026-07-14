/* [Tab] Einkauf — Einkaufsliste.
   Schritt 1 (Navigation & Struktur): Platzhalter mit Zweck-Beschreibung.
   Inhalte (Grundnahrungsmittel nach Kategorie) folgen in Schritt 4. */

export function EinkaufScreen() {
  return (
    <div className="fm-screen" style={{ paddingTop: 22 }}>
      <span className="fm-eyebrow fm-eyebrow--red">Einkauf</span>
      <h1 className="fm-display fm-display--md" style={{ margin: "10px 0 12px" }}>
        Die richtigen Grundlagen im Wagen.
      </h1>
      <p className="fm-body">
        Eine kurze Liste guter Grundnahrungsmittel — mit Protein pro 100 g und einem Satz, warum
        es sich lohnt. Sortiert nach Protein, Gemüse und Beilage.
      </p>
      <p className="fm-small" style={{ marginTop: "auto", paddingTop: 24 }}>
        Inhalte folgen in Schritt 4.
      </p>
    </div>
  );
}
