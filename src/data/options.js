/* Gemeinsame Options-Konstanten — unverändert aus den Screens des Prototyps
   extrahiert (Werte entsprechen 1:1 den CHECK-Constraints in §9.1). */

export const MEDICAL_QUESTIONS = [
  "Bist du aktuell schwanger oder stillst du?",
  "Wurde dir von einem Arzt von körperlicher Aktivität oder einer Ernährungsumstellung abgeraten?",
  "Hast du eine schwere Erkrankung oder Essstörung, die ärztlich betreut werden sollte?",
  "Nimmst du Medikamente oder hast gesundheitliche Einschränkungen, die Training oder Ernährung stark beeinflussen?",
];

export const GOALS = [
  { value: "abnehmen", label: "Abnehmen" },
  { value: "energie_kraft", label: "Energie & Gesundheit" },
  { value: "muskelaufbau", label: "Muskelaufbau" },
];

export const LOCATIONS = [
  { value: "zuhause_ohne", label: "Zuhause ohne Geräte" },
  { value: "zuhause_kurzhanteln", label: "Zuhause mit Kurzhanteln" },
  { value: "fitnessstudio", label: "Fitnessstudio" },
];

export const TIME_OPTIONS = [
  { value: "kurz", label: "Kurz", hint: "ca. 10–15 Minuten" },
  { value: "mittel", label: "Mittel", hint: "ca. 20–30 Minuten" },
  { value: "lang", label: "Lang", hint: "40 Minuten oder mehr" },
];

export const ENERGY_OPTIONS = [
  { value: "niedrig", label: "Niedrig" },
  { value: "normal", label: "Normal" },
  { value: "gut", label: "Gut" },
];

export const REMINDER_OPTIONS = [
  { value: "keine", label: "Keine Erinnerung" },
  { value: "morgens", label: "Morgens" },
  { value: "mittags", label: "Mittags" },
  { value: "abends", label: "Abends" },
];

export const STATUS_LABELS = {
  trial: "Testphase",
  active: "Aktiv",
  paused: "Pausiert (Zahlung offen)",
  cancelled: "Gekündigt",
};
