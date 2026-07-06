/** Einzelne Option innerhalb einer Radiogroup (ChoiceGroup oder Ja/Nein-Paar).
    Bewusst nicht memoisiert: Gruppen haben 2–4 Einträge, und Inline-Handler
    würden ein memo ohnehin bei jedem Render invalidieren. */
export function Choice({ selected, label, hint, onSelect }) {
  return (
    <button
      className="fm-choice"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      type="button"
    >
      <span>
        <span style={{ display: "block" }}>{label}</span>
        {hint && <span className="fm-choice__hint">{hint}</span>}
      </span>
      <span className="fm-choice__dot" aria-hidden="true" />
    </button>
  );
}
