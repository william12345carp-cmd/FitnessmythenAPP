/* Die vier Basisdaten-Felder aus §4 — exakt diese, keine weiteren.
   Gemeinsam genutzt von Onboarding (Schritt 2) und Profil-Bearbeitung,
   damit beide Stellen nie auseinanderlaufen. */

import { GOALS, LOCATIONS } from "../data/options.js";
import { Field } from "./ui/Field.jsx";
import { ChoiceGroup } from "./ui/ChoiceGroup.jsx";

export function BasicsFields({
  weight,
  onWeightChange,
  targetWeight,
  onTargetWeightChange,
  goal,
  onGoalChange,
  location,
  onLocationChange,
  weightPlaceholder,
  targetWeightPlaceholder,
}) {
  return (
    <>
      <Field
        label="Körpergewicht (kg)"
        type="number"
        inputMode="decimal"
        min="1"
        placeholder={weightPlaceholder}
        value={weight}
        onChange={(e) => onWeightChange(e.target.value)}
      />
      <Field
        label="Zielkörpergewicht (kg)"
        type="number"
        inputMode="decimal"
        min="1"
        placeholder={targetWeightPlaceholder}
        value={targetWeight}
        onChange={(e) => onTargetWeightChange(e.target.value)}
      />
      <ChoiceGroup label="Grobes Ziel" options={GOALS} value={goal} onChange={onGoalChange} />
      <ChoiceGroup
        label="Ort & Equipment"
        options={LOCATIONS}
        value={location}
        onChange={onLocationChange}
      />
      {/* §4: Kein Freitext, keine weiteren Felder. Bewusst nichts ergänzt. */}
    </>
  );
}
