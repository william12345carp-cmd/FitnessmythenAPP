/* Trainingsplan-Typen für den Plan-Tab.
   Auswahl je nach Profil (tageProWoche) über getOptimalerPlan() in PlanScreen.jsx. */

export const PLAN_TYPEN = {
  "2x-ganzkoerper": {
    name: "2× Ganzkörper / Woche",
    beschreibung: "Ideal für Einsteiger und Menschen mit wenig Zeit.",
    tage: [
      {
        name: "Training A",
        uebungen: [
          { uebungId: "kniebeuge", saetze: 3, wdh: "8–12", pause: "90 Sek." },
          { uebungId: "liegestuetz", saetze: 3, wdh: "8–12", pause: "90 Sek." },
          { uebungId: "rudern-kurzhantel", saetze: 3, wdh: "8–12", pause: "90 Sek." },
          { uebungId: "hip-thrust", saetze: 3, wdh: "12–15", pause: "60 Sek." },
          { uebungId: "plank", saetze: 3, wdh: "20–40 Sek.", pause: "60 Sek." },
        ],
      },
      {
        name: "Training B",
        uebungen: [
          { uebungId: "ausfallschritt", saetze: 3, wdh: "8–10 pro Seite", pause: "90 Sek." },
          { uebungId: "schulterdruecken", saetze: 3, wdh: "10–12", pause: "90 Sek." },
          { uebungId: "klimmzug-negativ", saetze: 3, wdh: "5–8", pause: "120 Sek." },
          { uebungId: "rumaenisches-kreuzheben", saetze: 3, wdh: "10–12", pause: "90 Sek." },
          { uebungId: "dead-bug", saetze: 3, wdh: "8 pro Seite", pause: "60 Sek." },
        ],
      },
    ],
  },
  "3x-ganzkoerper": {
    name: "3× Ganzkörper / Woche",
    beschreibung: "Für alle mit etwas mehr Zeit — spürbar schnellerer Fortschritt.",
    tage: [
      {
        name: "Training A",
        uebungen: [
          { uebungId: "kniebeuge", saetze: 3, wdh: "8–12", pause: "90 Sek." },
          { uebungId: "liegestuetz", saetze: 3, wdh: "8–12", pause: "90 Sek." },
          { uebungId: "rudern-kurzhantel", saetze: 3, wdh: "8–12", pause: "90 Sek." },
          { uebungId: "plank", saetze: 3, wdh: "20–40 Sek.", pause: "60 Sek." },
        ],
      },
      {
        name: "Training B",
        uebungen: [
          { uebungId: "ausfallschritt", saetze: 3, wdh: "8–10 pro Seite", pause: "90 Sek." },
          { uebungId: "schulterdruecken", saetze: 3, wdh: "10–12", pause: "90 Sek." },
          { uebungId: "klimmzug-negativ", saetze: 3, wdh: "5–8", pause: "120 Sek." },
          { uebungId: "dead-bug", saetze: 3, wdh: "8 pro Seite", pause: "60 Sek." },
        ],
      },
      {
        name: "Training C",
        uebungen: [
          { uebungId: "hip-thrust", saetze: 3, wdh: "12–15", pause: "60 Sek." },
          { uebungId: "trizeps-dips", saetze: 3, wdh: "8–12", pause: "90 Sek." },
          { uebungId: "bizeps-curl", saetze: 3, wdh: "10–12", pause: "60 Sek." },
          { uebungId: "rumaenisches-kreuzheben", saetze: 3, wdh: "10–12", pause: "90 Sek." },
          { uebungId: "mountainclimber", saetze: 3, wdh: "20 Sek.", pause: "45 Sek." },
        ],
      },
    ],
  },
  "4x-ober-unter": {
    name: "4× Ober-/Unterkörper-Split",
    beschreibung: "Für erfahrenere Trainierende mit viel Zeit im Studio.",
    tage: [
      {
        name: "Oberkörper A",
        uebungen: [
          { uebungId: "liegestuetz", saetze: 4, wdh: "10–12", pause: "90 Sek." },
          { uebungId: "rudern-kurzhantel", saetze: 4, wdh: "10–12", pause: "90 Sek." },
          { uebungId: "schulterdruecken", saetze: 3, wdh: "8–10", pause: "90 Sek." },
          { uebungId: "bizeps-curl", saetze: 3, wdh: "10–12", pause: "60 Sek." },
        ],
      },
      {
        name: "Unterkörper A",
        uebungen: [
          { uebungId: "kniebeuge", saetze: 4, wdh: "6–10", pause: "120 Sek." },
          { uebungId: "rumaenisches-kreuzheben", saetze: 4, wdh: "8–10", pause: "120 Sek." },
          { uebungId: "ausfallschritt", saetze: 3, wdh: "10–12 pro Seite", pause: "90 Sek." },
          { uebungId: "wadenheben", saetze: 3, wdh: "15–20", pause: "60 Sek." },
        ],
      },
      {
        name: "Oberkörper B",
        uebungen: [
          { uebungId: "klimmzug-negativ", saetze: 4, wdh: "6–10", pause: "120 Sek." },
          { uebungId: "trizeps-dips", saetze: 3, wdh: "10–15", pause: "90 Sek." },
          { uebungId: "schulterdruecken", saetze: 3, wdh: "10–12", pause: "90 Sek." },
          { uebungId: "plank", saetze: 3, wdh: "45–60 Sek.", pause: "60 Sek." },
        ],
      },
      {
        name: "Unterkörper B",
        uebungen: [
          { uebungId: "hip-thrust", saetze: 4, wdh: "10–15", pause: "90 Sek." },
          { uebungId: "ausfallschritt", saetze: 4, wdh: "10–12 pro Seite", pause: "90 Sek." },
          { uebungId: "dead-bug", saetze: 3, wdh: "10 pro Seite", pause: "60 Sek." },
          { uebungId: "mountainclimber", saetze: 3, wdh: "30 Sek.", pause: "45 Sek." },
        ],
      },
    ],
  },
};

/* Es gibt in profiles kein Tage/Woche-Feld — Auswahl daher aus Equipment
   und Ziel abgeleitet: Studio + Muskelaufbau bekommt den 4er-Split, alle
   anderen den 3x-Ganzkörper-Plan (passt am besten zu wenig Zeit/Stress). */
export function getOptimalerPlan(profil) {
  if (profil?.location_equipment === "fitnessstudio" && profil?.goal === "muskelaufbau") {
    return "4x-ober-unter";
  }
  return "3x-ganzkoerper";
}

export function filterUebungenNachEquipment(uebungen, locationEquipment) {
  if (locationEquipment === "zuhause_ohne") return uebungen.filter((u) => u.equipment.includes("nichts"));
  if (locationEquipment === "zuhause_kurzhanteln")
    return uebungen.filter((u) => u.equipment.includes("kurzhanteln") || u.equipment.includes("nichts"));
  return uebungen;
}
