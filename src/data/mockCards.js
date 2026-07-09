/* ============================================================================
   [2] CONTENT_CARDS — Content-Bibliothek (V1: 7 Karten aus §7 + Fallback)
   Feldnamen entsprechen 1:1 dem SQL-Schema `content_cards` (§9.1).

   Textgrundlage (2026-07-07): evidenzbasierte Wissensbasis des Gründers.
   - Übungsanleitungen: exakte Schritte, Fehler und Regressionen aus den
     Übungsdaten (Kniebeuge, Liegestütz, einarm. Rudern, Ausfallschritt).
   - Sätze/Wiederholungen/Pausen: Anfänger-Ganzkörper-Standard (3 Sätze,
     8–12 Wdh., ~90 s Pause), Anstrengung ~2 Wiederholungen vor dem Versagen.
   - Ernährung: Protein-Werte der Wissensbasis (Magerquark ~12 g/100 g, Skyr
     ~11 g, Ei ~7 g, mageres Fleisch ~22 g, Hüttenkäse ~13 g, Haferflocken
     ~13,5 g). Regel: jede Hauptmahlzeit ≥ 30 g; Tagesziel dynamisch aus
     Zielgewicht × 1,6 g ({protein_target}, aufgelöst in resolveCardText).
   - Begründungen: Studienkernaussagen (u. a. Krafttraining als Gesundheits-
     maßnahme, Konsistenz vor Intensität, Regeneration) in Alltagssprache.

   TODO: Vollständige Bibliothek von 30–40 Karten liefert der Gründer nach (§11).
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
    core_action_detail:
      "Zieh feste Schuhe an und geh 10 Minuten in ruhigem bis leicht zügigem Tempo vor die Tür — schnell genug, dass du dich nebenbei noch unterhalten könntest. Keine Strecke, kein Ziel, keine App nötig. Wenn 10 Minuten heute zu viel sind, reichen auch 5. Der Weg zählt als volle Alltagsbewegung.",
    core_action_reason:
      "Schon zehn Minuten Bewegung heben Kreislauf und Stimmung. Bei niedriger Energie wirkt ein Spaziergang oft belebender als Ausruhen — ganz ohne Trainingsdruck.",
    secondary_text:
      "Iss zu jeder Mahlzeit zuerst die Proteinquelle — sie sättigt am längsten und schützt die Muskeln. Ziel: {protein_target} g Eiweiß, jede Hauptmahlzeit über 30 g. Beispiel-Tag: Frühstück — 250 g Magerquark mit Beeren und 3 EL Haferflocken (≈ 40 g). Mittag — 180 g Hähnchenbrust mit Kartoffeln (≈ 40 g). Abend — 200 g körniger Frischkäse auf 2 Scheiben Roggenvollkornbrot (≈ 32 g).",
    focus_text: null,
    shopping_hint: "Magerquark, Hähnchenbrust und körniger Frischkäse — günstige Protein-Basis.",
  },
  {
    id: "card-02",
    time_tag: "lang",
    energy_tag: "gut",
    location_tag: "fitnessstudio",
    is_reentry_card: false,
    core_action_text: "Heute: 40 Minuten Ganzkörpertraining.",
    core_action_detail:
      "Erst 5 Minuten dynamisch aufwärmen (Gelenke kreisen, lockeres Radfahren) und die erste Übung mit leichtem Gewicht antesten — statisches Dehnen vor dem Heben weglassen, es mindert kurzfristig die Kraft. Dann 3 Sätze pro Übung, je 8–12 Wiederholungen, 90 Sekunden Pause. 1) Kniebeuge (Beine, Gesäß): etwas weiter als schulterbreit stehen, Fußspitzen leicht nach außen. Hüfte nach hinten schieben wie zum Hinsetzen, bis die Oberschenkel waagerecht sind, Rücken gerade. Über die Fersen hochdrücken; die Knie zeigen zu den Zehen und kippen nicht nach innen. 2) Rudern am Kabelzug (Rücken): aufrecht sitzen, Griff zum Bauchnabel ziehen, dabei die Schulterblätter hinten zusammenführen, langsam zurückführen. 3) Schulterdrücken mit Kurzhanteln: von Schulterhöhe gerade nach oben drücken, kontrolliert absenken. Wähle das Gewicht so, dass am Satzende noch etwa 2 saubere Wiederholungen möglich wären.",
    core_action_reason:
      "Ganzkörper-Krafttraining zwei- bis dreimal pro Woche gilt in der Forschung als eine der wirksamsten Maßnahmen für Gesundheit und Muskelerhalt. Für einen Reiz reichen wenige harte Sätze — Technik zählt mehr als Gewicht.",
    secondary_text:
      "An Trainingstagen zählt Protein besonders — verteil {protein_target} g auf 3–4 Mahlzeiten. Beispiel: Frühstück — Rührei aus 3 Eiern mit Vollkornbrot (≈ 24 g). Nach dem Training — 300 g Magerquark mit Banane (≈ 36 g). Abend — 180 g Lachs mit Kartoffeln (≈ 38 g). Snack — 200 g Skyr (≈ 22 g).",
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
    core_action_text: "Willkommen zurück. Heute reicht ein kleiner Neustart.",
    core_action_detail:
      "Zieh dir Schuhe an und geh 5 Minuten spazieren — mehr ist heute ausdrücklich nicht nötig. Kein Tempo, kein Ziel, keine Aufholjagd. Wenn du danach Lust auf mehr hast, ist das ein Bonus, keine Pflicht. Der erste Schritt nach einer Pause ist der schwerste — und du machst ihn gerade.",
    core_action_reason:
      "Nach einer Pause zählt nicht die Intensität, sondern der erste Schritt. Beständigkeit über Wochen schlägt jede einzelne Höchstleistung.",
    secondary_text:
      "Wenn du magst, bau bei einer Mahlzeit eine Proteinquelle ein — das hält satt und stützt den Wiedereinstieg. Eine reicht heute schon: ein Becher Skyr (150 g ≈ 16 g Eiweiß), 3 Eier (≈ 21 g) oder 200 g Hüttenkäse (≈ 26 g). Kein Muss, nur ein Angebot.",
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
    core_action_detail:
      "3 Sätze pro Übung, je 10–12 Wiederholungen, 60–90 Sekunden Pause. 1) Goblet-Kniebeuge: eine Hantel senkrecht vor der Brust halten, schulterbreit stehen, Hüfte nach hinten schieben und absetzen bis die Oberschenkel waagerecht sind, über die Fersen hoch. 2) Ausfallschritt rückwärts: aus dem Stand einen großen Schritt nach hinten, die Hüfte senkrecht absenken bis beide Knie etwa 90 Grad zeigen, über die vordere Ferse zurückdrücken; Bein für Bein abwechseln. Rückwärts schont die Kniescheibe mehr als vorwärts. 3) Einarmiges Kurzhantelrudern: eine Hand auf Oberschenkel oder Bank abstützen, Rücken gerade und fast waagerecht, die Hantel mit dem Ellbogen eng am Körper zur Hüfte ziehen, langsam absenken. Wähle das Gewicht so, dass die letzten 2 Wiederholungen wirklich fordern.",
    core_action_reason:
      "Auch mit zwei Kurzhanteln entsteht ein vollständiger Reiz, wenn du die großen Muskelgruppen — Beine, Gesäß, Rücken — belastest. Mehr Equipment bringt Anfängern keinen Vorteil.",
    secondary_text:
      "Ziel: {protein_target} g Eiweiß. Beispiel-Tag mit Alltagszutaten: Frühstück — 200 g Skyr mit Haferflocken (≈ 30 g). Mittag — 1 Dose Thunfisch (150 g) auf Salat mit 2 Eiern (≈ 46 g). Abend — 250 g Magerquark mit Roggenvollkornbrot (≈ 38 g).",
    focus_text: "Fokus heute: Trink vor jeder Mahlzeit ein großes Glas Wasser.",
    shopping_hint: "Skyr, Thunfisch in Dosen, Eier und Magerquark.",
  },
  {
    id: "card-05",
    time_tag: "kurz",
    energy_tag: "gut",
    location_tag: "zuhause_ohne",
    is_reentry_card: false,
    core_action_text: "Heute: 15 Minuten Eigengewicht-Ganzkörper.",
    core_action_detail:
      "3 Runden, dazwischen 60 Sekunden Pause. 1) Kniebeuge (15 Wdh.): schulterbreit stehen, Hüfte nach hinten schieben und absetzen bis die Oberschenkel waagerecht sind, über die Fersen hoch. 2) Liegestütz (8–12 sauber): Hände etwas breiter als schulterbreit, Körper bildet eine gerade Linie von Kopf bis Ferse, Ellbogen im 45-Grad-Winkel zum Rumpf, Brust Richtung Boden senken, kraftvoll hochdrücken. Zu schwer? Hände erhöht an der Tischkante abstützen oder auf den Knien ausführen. 3) Ausfallschritt rückwärts (10 pro Bein): großer Schritt nach hinten, Hüfte senkrecht absenken, über die vordere Ferse zurück. Lieber weniger Wiederholungen mit sauberer Technik als viele mit schlechter.",
    core_action_reason:
      "Dein eigenes Körpergewicht genügt für einen echten Trainingsreiz aller großen Muskelgruppen — auch in 15 Minuten. Entscheidend ist die saubere Ausführung, nicht das Gewicht.",
    secondary_text:
      "Ziel: {protein_target} g Eiweiß, ganz ohne Pulver. Frühstück — Omelett aus 3 Eiern mit Käse (≈ 28 g). Mittag — 200 g Hähnchen oder Pute mit roten Linsennudeln (≈ 60 g). Abend — 250 g körniger Frischkäse mit Tomaten (≈ 33 g).",
    focus_text: null,
    shopping_hint: "Eier, Hähnchen- oder Putenfilet, rote Linsennudeln, körniger Frischkäse.",
  },
  {
    id: "card-06",
    time_tag: "lang",
    energy_tag: "niedrig",
    location_tag: "egal",
    is_reentry_card: false,
    core_action_text: "Heute: leichte Bewegung statt Intensität.",
    core_action_detail:
      "20 Minuten locker spazieren oder sanft mobilisieren — heute kein Krafttraining. Beim Dehnen jede Position 20–30 Sekunden ruhig halten, nie bis in den Schmerz, gleichmäßig weiteratmen. Ein einfacher Ablauf: Arme und Hüfte kreisen, Nacken langsam zur Seite neigen (beide Seiten), im Stehen mit geraden Beinen locker Richtung Boden greifen (dehnt die Beinrückseite), dann im Stand einen Fuß zum Gesäß ziehen (Oberschenkelvorderseite). Nicht wippen, nur ruhig halten.",
    core_action_reason:
      "Muskeln wachsen in der Erholung, nicht im Training. Bei niedriger Energie bringt ein Ruhetag mit leichter Bewegung mehr als ein erzwungener Reiz — plane rund 48 Stunden Pause pro Muskelgruppe ein.",
    secondary_text:
      "Auch am Ruhetag repariert dein Körper Muskeln — dafür braucht er Protein. Ziel: {protein_target} g. Frühstück — 250 g Magerquark mit Beeren (≈ 30 g). Mittag — 2 Eier und 200 g Hüttenkäse auf Vollkornbrot (≈ 40 g). Abend — 150 g Lachs oder Hähnchenrest mit Salat (≈ 33 g).",
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
    core_action_detail:
      "3 Sätze pro Übung, je 10 Wiederholungen, 75 Sekunden Pause. 1) Bankdrücken oder Liegestütz (Brust): beim Bankdrücken die Hanteln/Stange kontrolliert bis auf Brusthöhe senken und gerade nach oben drücken, Ellbogen etwa im 45-Grad-Winkel; alternativ Liegestütz mit dem Körper in gerader Linie. 2) Rudern (Rücken): am Kabelzug oder vorgebeugt mit Hanteln zum Bauch ziehen, Schulterblätter zusammenführen, langsam zurück. 3) Schulterdrücken (Schultern): Kurzhanteln von Schulterhöhe gerade nach oben drücken, kontrolliert absenken. Wähle das Gewicht so, dass die letzten 2 Wiederholungen fordern, die Technik aber sauber bleibt.",
    core_action_reason:
      "Drücken und Ziehen im Wechsel baut den Oberkörper ausgewogen auf und gleicht die typische nach vorn gebeugte Schreibtischhaltung wieder aus.",
    secondary_text:
      "Ziel: {protein_target} g Eiweiß. Frühstück — 300 g Magerquark mit Haferflocken (≈ 43 g). Mittag — 180 g Hähnchenbrust mit Reis (≈ 40 g). Abend — 3 Eier und 150 g Hüttenkäse (≈ 40 g).",
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
    core_action_text: "Heute: 15 Minuten zügig spazieren.",
    core_action_detail:
      "Zieh feste Schuhe an und geh 15 Minuten zügig — so schnell, dass Reden noch geht, Singen aber schwerfiele. Lass die Arme locker mitschwingen und halt das Tempo gleichmäßig. Egal wann es heute reinpasst: Ein Weg zur Arbeit, zum Bäcker oder einfach um den Block zählt genauso.",
    core_action_reason:
      "Zügiges Gehen ist eine der am besten belegten Alltagsmaßnahmen für Herz, Kreislauf und Energie — ohne Equipment, ohne Vorbereitung.",
    secondary_text:
      "Ziel: mind. {protein_target} g Eiweiß, eine Proteinquelle pro Mahlzeit. Frühstück — 250 g Magerquark mit Beeren (≈ 30 g). Mittag — 180 g Hähnchenbrust mit Kartoffeln (≈ 40 g). Abend — 200 g Hüttenkäse mit Vollkornbrot (≈ 32 g).",
    focus_text: null,
    shopping_hint: "Magerquark, Hähnchenbrust, Hüttenkäse.",
  },
];
