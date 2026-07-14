/* [Tab] Wissen — Wissensplattform.
   Schritt 1 (Navigation & Struktur): Platzhalter mit Zweck-Beschreibung.
   Inhalte (Themen aus der Wissensbasis) folgen in Schritt 2. */

export function WissenScreen() {
  return (
    <div className="fm-screen" style={{ paddingTop: 22 }}>
      <span className="fm-eyebrow fm-eyebrow--red">Wissen</span>
      <h1 className="fm-display fm-display--md" style={{ margin: "10px 0 12px" }}>
        Verstehen, was wirklich zählt.
      </h1>
      <p className="fm-body">
        Die wichtigsten Gesundheitsthemen — kurz, wissenschaftlich belegt und ohne Fachjargon.
        Jedes Thema endet mit genau einer konkreten Handlung für heute.
      </p>
      <p className="fm-small" style={{ marginTop: "auto", paddingTop: 24 }}>
        Inhalte folgen in Schritt 2.
      </p>
    </div>
  );
}
