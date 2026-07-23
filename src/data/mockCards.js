/* ============================================================================
   [2] CONTENT_CARDS — Content-Bibliothek (V1: 7 Karten aus §7 + Fallback)

   Strukturiertes Content-Modell (2026-07-10): Übungen und Mahlzeiten liegen
   als echte Felder vor (steps[], spec[], meals[]) statt als Fließtext, damit
   die Tageskarte sie sauber und lesbar darstellen kann. Inhalte stammen 1:1
   aus der evidenzbasierten Wissensbasis des Gründers (Übungsschritte,
   Anfänger-Ganzkörper-Standard, Protein-Werte pro 100 g, Studienaussagen).

   Feld-Übersicht (alle außer den Tags optional, Renderer zeigt nur Vorhandenes):
     core_action_text   Titel / Kern-Handlung (Pflicht)
     spec[]             Chips: Sätze · Wdh · Pause (Trainingskarten)
     intro              Einleitung vor den Schritten (z. B. Aufwärmen)
     steps[]            [{ name, detail }] — nummerierte Übungsschritte
     tip                kurzer Intensitäts-/Technik-Hinweis unter den Schritten
     core_action_detail Fließtext-Anleitung für Nicht-Trainingskarten (Gehen/Dehnen)
     core_action_reason "Warum" — Begründung, 1–2 Sätze ohne Fachjargon (§5.6)
     nutrition          { lead?, meals[]?, options[]?, footnote? } (§5.1)
     focus_text         optionaler Zusatz-Fokus (z. B. Wasser)
     shopping_hint      Einkaufstipp

   Protein-Tagesziel wird im Renderer aus target_weight_kg × 1,6 g berechnet
   (proteinTarget) und als ruhiges Badge angezeigt — Regel: ≥ 30 g je Mahlzeit.

   TODO: Vollständige Bibliothek (30–40 Karten) liefert der Gründer nach (§11).
   TODO: Content nach content_cards (Supabase) auslagern, sobald die Bibliothek
   wächst — Feldstruktur hier ist bereits DB-tauglich. Entscheidung Gründer.
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
    core_action_text: "10 Minuten Bewegung.",
    core_action_detail:
      "Zieh feste Schuhe an und geh 10 Minuten in ruhigem bis leicht zügigem Tempo vor die Tür — schnell genug, dass du dich nebenbei noch unterhalten könntest. Keine Strecke, kein Ziel, keine App nötig. Wenn 10 Minuten heute zu viel sind, reichen auch 5. Der Weg zählt als volle Alltagsbewegung.",
    core_action_reason:
      "Schon zehn Minuten Bewegung heben Kreislauf und Stimmung. Bei niedriger Energie wirkt ein Spaziergang oft belebender als Ausruhen — ganz ohne Trainingsdruck.",
    nutrition: {
      lead: "Iss zu jeder Mahlzeit zuerst die Proteinquelle — sie sättigt am längsten und schützt die Muskeln.",
      meals: [
        {
          when: "Frühstück",
          food: "250 g Magerquark mit Beeren und 3 EL Haferflocken",
          grams: "≈ 40 g",
        },
        { when: "Mittag", food: "180 g Hähnchenbrust mit Kartoffeln", grams: "≈ 40 g" },
        {
          when: "Abend",
          food: "200 g körniger Frischkäse auf 2 Scheiben Roggenvollkornbrot",
          grams: "≈ 32 g",
        },
      ],
    },
    focus_text: null,
    shopping_hint: "Magerquark, Hähnchenbrust und körniger Frischkäse — günstige Protein-Basis.",
  },
  {
    id: "card-02",
    time_tag: "lang",
    energy_tag: "gut",
    location_tag: "fitnessstudio",
    is_reentry_card: false,
    core_action_text: "40 Minuten Ganzkörpertraining.",
    spec: ["3 Sätze", "8–12 Wdh", "90 s Pause"],
    intro:
      "Erst 5 Minuten dynamisch aufwärmen (Gelenke kreisen, lockeres Radfahren) und die erste Übung mit leichtem Gewicht antesten — statisches Dehnen vor dem Heben weglassen, es mindert kurzfristig die Kraft.",
    steps: [
      {
        name: "Kniebeuge — Beine & Gesäß",
        detail:
          "Etwas weiter als schulterbreit stehen, Fußspitzen leicht nach außen. Hüfte nach hinten schieben wie zum Hinsetzen, bis die Oberschenkel waagerecht sind, Rücken gerade. Über die Fersen hochdrücken; die Knie zeigen zu den Zehen und kippen nicht nach innen.",
      },
      {
        name: "Rudern am Kabelzug — Rücken",
        detail:
          "Aufrecht sitzen, den Griff zum Bauchnabel ziehen, dabei die Schulterblätter hinten zusammenführen, langsam zurückführen.",
      },
      {
        name: "Schulterdrücken mit Kurzhanteln",
        detail: "Von Schulterhöhe gerade nach oben drücken, kontrolliert absenken.",
      },
    ],
    tip: "Gewicht so wählen, dass am Satzende noch etwa 2 saubere Wiederholungen möglich wären.",
    core_action_reason:
      "Ganzkörper-Krafttraining zwei- bis dreimal pro Woche gilt in der Forschung als eine der wirksamsten Maßnahmen für Gesundheit und Muskelerhalt. Für einen Reiz reichen wenige harte Sätze — Technik zählt mehr als Gewicht.",
    nutrition: {
      lead: "An Trainingstagen zählt Protein besonders — verteil es auf 3–4 Mahlzeiten.",
      meals: [
        { when: "Frühstück", food: "Rührei aus 3 Eiern mit Vollkornbrot", grams: "≈ 24 g" },
        { when: "Nach dem Training", food: "300 g Magerquark mit Banane", grams: "≈ 36 g" },
        { when: "Abend", food: "180 g Lachs mit Kartoffeln", grams: "≈ 38 g" },
        { when: "Snack", food: "200 g Skyr", grams: "≈ 22 g" },
      ],
    },
    focus_text: null,
    shopping_hint: "Eier, Magerquark, Lachs- oder Hähnchenfilet und Skyr.",
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
    core_action_text: "Ein kleiner Neustart.",
    core_action_detail:
      "Zieh dir Schuhe an und geh 5 Minuten spazieren — mehr ist heute ausdrücklich nicht nötig. Kein Tempo, kein Ziel, keine Aufholjagd. Wenn du danach Lust auf mehr hast, ist das ein Bonus, keine Pflicht. Der erste Schritt nach einer Pause ist der schwerste — und du machst ihn gerade.",
    core_action_reason:
      "Nach einer Pause zählt nicht die Intensität, sondern der erste Schritt. Beständigkeit über Wochen schlägt jede einzelne Höchstleistung.",
    nutrition: {
      lead: "Wenn du magst, bau bei einer Mahlzeit eine Proteinquelle ein — das hält satt und stützt den Wiedereinstieg. Eine reicht heute schon:",
      options: [
        { food: "ein Becher Skyr (150 g)", grams: "≈ 16 g" },
        { food: "3 Eier", grams: "≈ 21 g" },
        { food: "200 g Hüttenkäse", grams: "≈ 26 g" },
      ],
      footnote: "Kein Muss, nur ein Angebot.",
    },
    focus_text: null,
    shopping_hint: null,
  },
  {
    id: "card-04",
    time_tag: "mittel",
    energy_tag: "normal",
    location_tag: "zuhause_kurzhanteln",
    is_reentry_card: false,
    core_action_text: "20 Minuten Kurzhantel-Ganzkörper.",
    spec: ["3 Sätze", "10–12 Wdh", "60–90 s Pause"],
    steps: [
      {
        name: "Goblet-Kniebeuge",
        detail:
          "Eine Hantel senkrecht vor der Brust halten, schulterbreit stehen, Hüfte nach hinten schieben und absetzen bis die Oberschenkel waagerecht sind, über die Fersen hoch.",
      },
      {
        name: "Ausfallschritt rückwärts",
        detail:
          "Aus dem Stand einen großen Schritt nach hinten, die Hüfte senkrecht absenken bis beide Knie etwa 90 Grad zeigen, über die vordere Ferse zurückdrücken; Bein für Bein abwechseln. Rückwärts schont die Kniescheibe mehr als vorwärts.",
      },
      {
        name: "Einarmiges Kurzhantelrudern",
        detail:
          "Eine Hand auf Oberschenkel oder Bank abstützen, Rücken gerade und fast waagerecht, die Hantel mit dem Ellbogen eng am Körper zur Hüfte ziehen, langsam absenken.",
      },
    ],
    tip: "Gewicht so wählen, dass die letzten 2 Wiederholungen wirklich fordern.",
    core_action_reason:
      "Auch mit zwei Kurzhanteln entsteht ein vollständiger Reiz, wenn du die großen Muskelgruppen — Beine, Gesäß, Rücken — belastest. Mehr Equipment bringt Anfängern keinen Vorteil.",
    nutrition: {
      meals: [
        { when: "Frühstück", food: "200 g Skyr mit Haferflocken", grams: "≈ 30 g" },
        { when: "Mittag", food: "1 Dose Thunfisch (150 g) auf Salat mit 2 Eiern", grams: "≈ 46 g" },
        { when: "Abend", food: "250 g Magerquark mit Roggenvollkornbrot", grams: "≈ 38 g" },
      ],
    },
    focus_text: "Trink vor jeder Mahlzeit ein großes Glas Wasser.",
    shopping_hint: "Skyr, Thunfisch in Dosen, Eier und Magerquark.",
  },
  {
    id: "card-05",
    time_tag: "kurz",
    energy_tag: "gut",
    location_tag: "zuhause_ohne",
    is_reentry_card: false,
    core_action_text: "15 Minuten Eigengewicht-Ganzkörper.",
    spec: ["3 Runden", "60 s Pause"],
    steps: [
      {
        name: "Kniebeuge — 15 Wdh.",
        detail:
          "Schulterbreit stehen, Hüfte nach hinten schieben und absetzen bis die Oberschenkel waagerecht sind, über die Fersen hoch.",
      },
      {
        name: "Liegestütz — 8–12 sauber",
        detail:
          "Hände etwas breiter als schulterbreit, Körper bildet eine gerade Linie von Kopf bis Ferse, Ellbogen im 45-Grad-Winkel zum Rumpf, Brust Richtung Boden senken, kraftvoll hochdrücken. Zu schwer? Hände erhöht an der Tischkante abstützen oder auf den Knien ausführen.",
      },
      {
        name: "Ausfallschritt rückwärts — 10 pro Bein",
        detail:
          "Großer Schritt nach hinten, Hüfte senkrecht absenken, über die vordere Ferse zurück.",
      },
    ],
    tip: "Lieber weniger Wiederholungen mit sauberer Technik als viele mit schlechter.",
    core_action_reason:
      "Dein eigenes Körpergewicht genügt für einen echten Trainingsreiz aller großen Muskelgruppen — auch in 15 Minuten. Entscheidend ist die saubere Ausführung, nicht das Gewicht.",
    nutrition: {
      lead: "Ganz ohne Pulver:",
      meals: [
        { when: "Frühstück", food: "Omelett aus 3 Eiern mit Käse", grams: "≈ 28 g" },
        {
          when: "Mittag",
          food: "200 g Hähnchen oder Pute mit roten Linsennudeln",
          grams: "≈ 60 g",
        },
        { when: "Abend", food: "250 g körniger Frischkäse mit Tomaten", grams: "≈ 33 g" },
      ],
    },
    focus_text: null,
    shopping_hint: "Eier, Hähnchen- oder Putenfilet, rote Linsennudeln, körniger Frischkäse.",
  },
  {
    id: "card-06",
    time_tag: "lang",
    energy_tag: "niedrig",
    location_tag: "egal",
    is_reentry_card: false,
    core_action_text: "Leichte Bewegung statt Intensität.",
    core_action_detail:
      "20 Minuten locker spazieren oder sanft mobilisieren — heute kein Krafttraining. Beim Dehnen jede Position 20–30 Sekunden ruhig halten, nie bis in den Schmerz, gleichmäßig weiteratmen. Ein einfacher Ablauf: Arme und Hüfte kreisen, Nacken langsam zur Seite neigen (beide Seiten), im Stehen mit geraden Beinen locker Richtung Boden greifen (dehnt die Beinrückseite), dann im Stand einen Fuß zum Gesäß ziehen (Oberschenkelvorderseite). Nicht wippen, nur ruhig halten.",
    core_action_reason:
      "Muskeln wachsen in der Erholung, nicht im Training. Bei niedriger Energie bringt ein Ruhetag mit leichter Bewegung mehr als ein erzwungener Reiz — plane rund 48 Stunden Pause pro Muskelgruppe ein.",
    nutrition: {
      lead: "Auch am Ruhetag repariert dein Körper Muskeln — dafür braucht er Protein.",
      meals: [
        { when: "Frühstück", food: "250 g Magerquark mit Beeren", grams: "≈ 30 g" },
        { when: "Mittag", food: "2 Eier und 200 g Hüttenkäse auf Vollkornbrot", grams: "≈ 40 g" },
        { when: "Abend", food: "150 g Lachs oder Hähnchenrest mit Salat", grams: "≈ 33 g" },
      ],
    },
    focus_text: null,
    shopping_hint: null,
  },
  {
    id: "card-07",
    time_tag: "mittel",
    energy_tag: "normal",
    location_tag: "fitnessstudio",
    is_reentry_card: false,
    core_action_text: "25 Minuten Oberkörper-Fokus.",
    spec: ["3 Sätze", "10 Wdh", "75 s Pause"],
    steps: [
      {
        name: "Bankdrücken oder Liegestütz — Brust",
        detail:
          "Beim Bankdrücken die Hanteln/Stange kontrolliert bis auf Brusthöhe senken und gerade nach oben drücken, Ellbogen etwa im 45-Grad-Winkel; alternativ Liegestütz mit dem Körper in gerader Linie.",
      },
      {
        name: "Rudern — Rücken",
        detail:
          "Am Kabelzug oder vorgebeugt mit Hanteln zum Bauch ziehen, Schulterblätter zusammenführen, langsam zurück.",
      },
      {
        name: "Schulterdrücken — Schultern",
        detail: "Kurzhanteln von Schulterhöhe gerade nach oben drücken, kontrolliert absenken.",
      },
    ],
    tip: "Gewicht so wählen, dass die letzten 2 Wiederholungen fordern, die Technik aber sauber bleibt.",
    core_action_reason:
      "Drücken und Ziehen im Wechsel baut den Oberkörper ausgewogen auf und gleicht die typische nach vorn gebeugte Schreibtischhaltung wieder aus.",
    nutrition: {
      meals: [
        { when: "Frühstück", food: "300 g Magerquark mit Haferflocken", grams: "≈ 43 g" },
        { when: "Mittag", food: "180 g Hähnchenbrust mit Reis", grams: "≈ 40 g" },
        { when: "Abend", food: "3 Eier und 150 g Hüttenkäse", grams: "≈ 40 g" },
      ],
    },
    focus_text: null,
    shopping_hint: "Magerquark, Hähnchenbrust, Eier und Hüttenkäse.",
  },
  {
    id: "card-fallback",
    // Die generischste Alternative gemäß §5.2
    // (time=mittel, energy=normal, location=egal, reentry=false).
    time_tag: "mittel",
    energy_tag: "normal",
    location_tag: "egal",
    is_reentry_card: false,
    core_action_text: "15 Minuten zügig spazieren.",
    core_action_detail:
      "Zieh feste Schuhe an und geh 15 Minuten zügig — so schnell, dass Reden noch geht, Singen aber schwerfiele. Lass die Arme locker mitschwingen und halt das Tempo gleichmäßig. Egal wann es heute reinpasst: Ein Weg zur Arbeit, zum Bäcker oder einfach um den Block zählt genauso.",
    core_action_reason:
      "Zügiges Gehen ist eine der am besten belegten Alltagsmaßnahmen für Herz, Kreislauf und Energie — ohne Equipment, ohne Vorbereitung.",
    nutrition: {
      lead: "Eine Proteinquelle pro Mahlzeit:",
      meals: [
        { when: "Frühstück", food: "250 g Magerquark mit Beeren", grams: "≈ 30 g" },
        { when: "Mittag", food: "180 g Hähnchenbrust mit Kartoffeln", grams: "≈ 40 g" },
        { when: "Abend", food: "200 g Hüttenkäse mit Vollkornbrot", grams: "≈ 32 g" },
      ],
    },
    focus_text: null,
    shopping_hint: "Magerquark, Hähnchenbrust, Hüttenkäse.",
  },
];
