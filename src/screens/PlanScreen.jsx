/* [Tab] Plan — Wochenplan.
   Schritt 1 (Navigation & Struktur): Platzhalter mit Zweck-Beschreibung.
   Inhalte (Mo–So, je ein Training + eine Ernährungs-Empfehlung) folgen in Schritt 3. */

export function PlanScreen() {
  return (
    <div className="fm-screen" style={{ paddingTop: 22 }}>
      <span className="fm-eyebrow fm-eyebrow--red">Plan</span>
      <h1 className="fm-display fm-display--md" style={{ margin: "10px 0 12px" }}>
        Deine Woche auf einen Blick.
      </h1>
      <p className="fm-body">
        Montag bis Sonntag — für jeden Tag ein Training und eine einfache Ernährungs-Empfehlung.
        Kein Kalender, keine Komplexität. Nur: Was mache ich heute?
      </p>
      <p className="fm-small" style={{ marginTop: "auto", paddingTop: 24 }}>
        Inhalte folgen in Schritt 3.
      </p>
    </div>
  );
}
