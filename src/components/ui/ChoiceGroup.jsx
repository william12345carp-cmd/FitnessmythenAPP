import { useId } from "react";
import { Choice } from "./Choice.jsx";

/**
 * Gruppe exklusiver Optionen mit korrekter Radiogroup-Semantik.
 * Dedupliziert das 6× wiederholte Muster "Label + Choice-Liste".
 */
export function ChoiceGroup({ label, options, value, onChange }) {
  const labelId = useId();
  return (
    <div>
      <p className="fm-label" id={labelId} style={{ marginBottom: 10 }}>
        {label}
      </p>
      <div className="fm-choices" role="radiogroup" aria-labelledby={labelId}>
        {options.map((o) => (
          <Choice
            key={o.value}
            label={o.label}
            hint={o.hint}
            selected={value === o.value}
            onSelect={() => onChange(o.value)}
          />
        ))}
      </div>
    </div>
  );
}
