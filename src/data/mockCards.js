/* ============================================================================
   [2] CONTENT_CARDS — Mock-Daten
   Exakt die 7 Beispielkarten aus §7 des Master-Prompts + 1 generische
   Fallback-Karte (von der Auswahl-Logik in §5.2 zwingend vorausgesetzt).
   TODO: Vollständige Bibliothek von 30–40 Karten liefert der Gründer nach (§11).
   Feldnamen entsprechen 1:1 dem SQL-Schema `content_cards` (§9.1).
============================================================================ */

export const CONTENT_CARDS = [
  {
    id: "card-01",
    // TODO: Beispiel 1 nennt "Zuhause" ohne Geräte-Angabe; Spaziergang ist
    // ortsunabhängig, daher hier location_tag "egal". Entscheidung liegt beim Gründer.
    time_tag: "kurz",
    energy_tag: "niedrig",
    location_tag: "egal",
    is_reentry_card: false,
    core_action_text: "Heute reicht: 10 Minuten Bewegung.",
    core_action_detail: "Mach einen 10-minütigen Spaziergang, egal wann er heute reinpasst.",
    core_action_reason:
      "Kurze Bewegung wirkt bei niedriger Energie oft aktivierender als Ruhe — ganz ohne Trainingsdruck. Das reicht heute völlig.",
    secondary_text:
      "Nebenbei: Iss bei der nächsten Mahlzeit zuerst deine Proteinquelle. Dein Ziel heute: mind. {protein_target} g Protein (Skyr, Eier, Hähnchen, Linsen zählen alle).",
    focus_text: null,
    shopping_hint: null,
  },
  {
    id: "card-02",
    time_tag: "lang",
    energy_tag: "gut",
    location_tag: "fitnessstudio",
    is_reentry_card: false,
    core_action_text: "Heute: 40 Minuten Ganzkörpertraining.",
    core_action_detail: "3 Sätze Kniebeuge, Rudern, Schulterdrücken — je 8–12 Wiederholungen.",
    core_action_reason:
      "Ganzkörper-Krafttraining 2–3x/Woche ist die am besten belegte Maßnahme für langfristige Gesundheit und Muskelerhalt.",
    secondary_text:
      "Nebenbei: Dein Protein-Ziel heute liegt bei {protein_target} g — verteile es auf 3–4 Mahlzeiten.",
    focus_text: null,
    shopping_hint: null,
  },
  {
    id: "card-03",
    // TODO: Reentry-Beispiel nennt keine Zeit/Energie-Tags. Hier als
    // mittel/normal/egal getaggt; weitere Reentry-Karten für alle Kombinationen
    // liefert der Gründer nach. Entscheidung liegt beim Gründer.
    time_tag: "mittel",
    energy_tag: "normal",
    location_tag: "egal",
    is_reentry_card: true,
    core_action_text: "Willkommen zurück. Heute reicht ein kleiner Neustart.",
    core_action_detail: "5 Minuten spazieren — mehr nicht.",
    core_action_reason:
      "Nach einer Pause zählt nicht Intensität, sondern der erste Schritt. Alles andere kommt von allein zurück.",
    secondary_text: null,
    focus_text: null,
    shopping_hint: null,
  },
  {
    id: "card-04",
    time_tag: "mittel",
    energy_tag: "normal",
    location_tag: "zuhause_kurzhanteln",
    is_reentry_card: false,
    core_action_text: "Heute: 20 Minuten Kurzhantel-Ganzkörper.",
    core_action_detail: "Kniebeuge mit Hanteln, Ausfallschritte, Rudern vorgebeugt — je 3 Sätze.",
    core_action_reason:
      "Auch mit wenig Equipment lässt sich ein vollständiger Trainingsreiz setzen, wenn die großen Muskelgruppen angesprochen werden.",
    secondary_text: null,
    focus_text: "Fokus heute: Trinke vor jeder Mahlzeit ein großes Glas Wasser.",
    shopping_hint: null,
  },
  {
    id: "card-05",
    time_tag: "kurz",
    energy_tag: "gut",
    location_tag: "zuhause_ohne",
    is_reentry_card: false,
    core_action_text: "Heute: 15 Minuten Eigengewicht-Ganzkörper.",
    core_action_detail: "Kniebeuge, Liegestütz, Ausfallschritte — je 3 Runden à 10 Wiederholungen.",
    core_action_reason:
      "Ohne Equipment lässt sich mit Eigengewicht ein vollständiger Trainingsreiz für alle großen Muskelgruppen setzen — auch in 15 Minuten.",
    secondary_text: null,
    focus_text: null,
    shopping_hint: null,
  },
  {
    id: "card-06",
    time_tag: "lang",
    energy_tag: "niedrig",
    location_tag: "egal",
    is_reentry_card: false,
    core_action_text: "Heute: leichte Bewegung statt Intensität.",
    core_action_detail:
      "20 Minuten lockeres Spazierengehen oder Dehnen — kein Krafttraining heute.",
    core_action_reason:
      "Bei niedriger Energie überwiegt der Erholungsnutzen den Trainingsreiz. Morgen ist wieder ein neuer Tag für mehr Intensität.",
    secondary_text: null,
    focus_text: null,
    shopping_hint: null,
  },
  {
    id: "card-07",
    time_tag: "mittel",
    energy_tag: "normal",
    location_tag: "fitnessstudio",
    is_reentry_card: false,
    core_action_text: "Heute: 25 Minuten Oberkörper-Fokus.",
    core_action_detail: "Bankdrücken oder Liegestütz, Rudern, Schulterdrücken — je 3 Sätze à 10.",
    core_action_reason:
      "Regelmäßiger Wechsel zwischen Muskelgruppen sorgt für ausgewogenen Aufbau ohne Übertraining einzelner Bereiche.",
    secondary_text: null,
    focus_text: null,
    shopping_hint: null,
  },
  {
    id: "card-fallback",
    // PLATZHALTER: Die generischste Alternative gemäß §5.2
    // (time=mittel, energy=normal, location=egal, reentry=false).
    // TODO: Finalen Text liefert der Gründer; dieser Platzhalter ist bewusst
    // eng an Beispiel 1 angelehnt. Entscheidung liegt beim Gründer.
    time_tag: "mittel",
    energy_tag: "normal",
    location_tag: "egal",
    is_reentry_card: false,
    core_action_text: "Heute: 15 Minuten zügig spazieren.",
    core_action_detail: "Ein zügiger Spaziergang, egal wann er heute reinpasst.",
    core_action_reason:
      "Zügiges Gehen ist eine der am besten belegten Alltagsmaßnahmen für Herz, Kreislauf und Energie — ohne Vorbereitung, ohne Equipment.",
    secondary_text:
      "Nebenbei: Dein Protein-Ziel heute: mind. {protein_target} g — eine Proteinquelle pro Mahlzeit reicht dafür meist aus.",
    focus_text: null,
    shopping_hint: null,
  },
];
