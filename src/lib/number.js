/* Zahlen-Helfer für Eingabefelder — dedupliziert aus Onboarding und Profil.
   Akzeptiert Komma- und Punkt-Dezimaltrennzeichen (deutsche Eingaben). */

export function parseDecimalInput(value) {
  return parseFloat(String(value).replace(",", "."));
}

export function isPositiveNumber(value) {
  return Number.isFinite(value) && value > 0;
}
