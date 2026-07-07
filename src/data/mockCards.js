/* ============================================================================
   [2] CONTENT_CARDS — Content-Bibliothek (V1: 7 Karten aus §7 + Fallback)
   Feldnamen entsprechen 1:1 dem SQL-Schema `content_cards` (§9.1).

   Textrichtung (Gründer-Feedback 2026-07-07): Jede Karte ist so geschrieben,
   dass sie auch ohne Trainings- oder Ernährungsvorwissen umsetzbar ist —
   vollständige Übungsanleitung in core_action_detail, drei konkrete Mahlzeiten
   mit echten Gramm-Angaben in secondary_text.

   Protein bleibt pro Nutzer dynamisch: {protein_target} = Zielgewicht × 1,6 g
   (aufgelöst in resolveCardText). Die Mahlzeiten-Beispiele nennen echte
   Einzel-Portionen samt Eiweißgehalt und sind bewusst großzügig kalkuliert;
   der Nutzer passt die Portionsgrößen an sein persönliches Ziel an.

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
      "So gehst du vor: Zieh feste Schuhe an und geh 10 Minuten in ruhigem Tempo vor die Tür — langsam genug, dass du dich nebenbei noch unterhalten könntest. Keine Strecke, kein Ziel, keine App nötig. Wenn 10 Minuten heute zu viel sind, reichen auch 5. Es zählt nur, dass du losgehst.",
    core_action_reason:
      "Kurze Bewegung wirkt bei niedriger Energie oft aktivierender als Ruhe — ganz ohne Trainingsdruck. Das reicht heute völlig.",
    secondary_text:
      "Iss bei jeder Mahlzeit zuerst die Proteinquelle. Dein Ziel heute: mind. {protein_target} g Eiweiß. Ein Beispiel-Tag: Frühstück — 250 g Magerquark mit einer Handvoll Haferflocken und Beeren (≈ 35 g Eiweiß). Mittag — 180 g Hähnchenbrust (gegart) mit Reis und Gemüse (≈ 54 g). Abend — 200 g Hüttenkäse auf 2 Scheiben Vollkornbrot (≈ 30 g). Das sind rund 120 g; passe die Portionen an dein Ziel an.",
    focus_text: null,
    shopping_hint: "Magerquark, Hähnchenbrust und Hüttenkäse — deckt Protein für zwei Tage.",
  },
  {
    id: "card-02",
    time_tag: "lang",
    energy_tag: "gut",
    location_tag: "fitnessstudio",
    is_reentry_card: false,
    core_action_text: "Heute: 40 Minuten Ganzkörpertraining.",
    core_action_detail:
      "Zuerst 5 Minuten locker aufwärmen (Fahrrad oder zügig gehen). Dann 3 Sätze pro Übung, je 8–12 Wiederholungen, dazwischen 90 Sekunden Pause. 1) Kniebeuge (Beine): Füße schulterbreit, Fußspitzen leicht nach außen. Setz dich langsam nach hinten, als würdest du dich auf einen Stuhl setzen, bis die Oberschenkel etwa waagerecht sind — Knie zeigen in Richtung der Fußspitzen. Über die Fersen wieder hochdrücken. Beginne mit leichter Langhantel oder nur Körpergewicht. 2) Rudern am Kabelzug (Rücken): Aufrecht sitzen, Griff zum Bauchnabel ziehen, dabei die Schulterblätter hinten zusammenführen, langsam zurückführen. 3) Schulterdrücken mit Kurzhanteln (Schultern): Hanteln auf Schulterhöhe, gerade nach oben drücken bis die Arme fast gestreckt sind, kontrolliert absenken. Gewicht-Faustregel: Wenn du am Satzende noch 3 oder mehr saubere Wiederholungen schaffen würdest, war es zu leicht.",
    core_action_reason:
      "Ganzkörper-Krafttraining 2–3x/Woche ist die am besten belegte Maßnahme für langfristige Gesundheit und Muskelerhalt.",
    secondary_text:
      "An einem Trainingstag ist Protein besonders wichtig. Ziel heute: {protein_target} g, verteilt auf 3–4 Mahlzeiten. Beispiel: Frühstück — Rührei aus 3 Eiern mit 2 Scheiben Vollkornbrot (≈ 30 g). Nach dem Training — 300 g Magerquark mit Banane (≈ 36 g). Abend — 180 g Lachs oder Hähnchen mit Kartoffeln (≈ 45 g). Zusammen rund 110 g; ein Skyr (150 g ≈ 15 g) schließt die Lücke.",
    focus_text: null,
    shopping_hint: "Eier, Magerquark und Lachs- oder Hähnchenfilet.",
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
      "Nach einer Pause zählt nicht Intensität, sondern der erste Schritt. Alles andere kommt von allein zurück.",
    secondary_text:
      "Wenn du magst, bau bei einer Mahlzeit heute eine Proteinquelle ein — das hält dich satt und stützt den Wiedereinstieg. Es reicht schon eine: ein Skyr (150 g ≈ 15 g Eiweiß), 3 Eier (≈ 19 g) oder ein Becher Hüttenkäse (200 g ≈ 26 g). Kein Muss heute, nur ein Angebot.",
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
      "3 Sätze pro Übung, je 10–12 Wiederholungen, 60–90 Sekunden Pause. 1) Kniebeuge mit Hanteln: In jeder Hand eine Hantel neben dem Körper. Füße schulterbreit, langsam nach hinten absetzen bis die Oberschenkel waagerecht sind, über die Fersen hochdrücken. 2) Ausfallschritte: Aus dem Stand einen großen Schritt nach vorn, das hintere Knie sinkt Richtung Boden bis beide Knie etwa 90 Grad zeigen, dann mit dem vorderen Fuß zurückdrücken. Bein für Bein abwechseln. 3) Vorgebeugtes Rudern: Oberkörper mit geradem Rücken nach vorn neigen (Knie leicht gebeugt), Hanteln hängen lassen, zum Bauch ziehen und die Schulterblätter zusammenführen, langsam absenken. Wähle das Gewicht so, dass die letzten 2 Wiederholungen wirklich fordern.",
    core_action_reason:
      "Auch mit wenig Equipment lässt sich ein vollständiger Trainingsreiz setzen, wenn die großen Muskelgruppen angesprochen werden.",
    secondary_text:
      "Ziel heute: {protein_target} g Eiweiß. Beispiel-Tag mit Alltagszutaten: Frühstück — 200 g Skyr mit Haferflocken (≈ 25 g). Mittag — 1 Dose Thunfisch (150 g) auf großem Salat mit Ei (≈ 38 g). Abend — 250 g Magerquark mit Kräutern und Vollkornbrot (≈ 32 g). Rund 95 g; ergänze eine Handvoll Nüsse oder einen zweiten Skyr bis zu deinem Ziel.",
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
      "3 Runden, dazwischen 60 Sekunden Pause. 1) Kniebeuge (15 Wiederholungen): Füße schulterbreit, langsam nach hinten absetzen bis die Oberschenkel waagerecht sind, über die Fersen hochdrücken. 2) Liegestütz (so viele sauber gehen, Ziel 8–12): Hände etwas breiter als schulterbreit, der Körper bleibt vom Kopf bis zu den Fersen eine gerade Linie, Brust Richtung Boden absenken, wieder hochdrücken. Zu schwer? Mach sie auf den Knien oder mit den Händen erhöht an einer Tischkante. 3) Ausfallschritte (10 pro Bein): Schritt nach vorn, hinteres Knie Richtung Boden senken, mit dem vorderen Fuß zurückdrücken. Sauber vor schnell — lieber weniger Wiederholungen mit guter Technik.",
    core_action_reason:
      "Ohne Equipment lässt sich mit Eigengewicht ein vollständiger Trainingsreiz für alle großen Muskelgruppen setzen — auch in 15 Minuten.",
    secondary_text:
      "Ziel heute: {protein_target} g Eiweiß, ganz ohne Pulver. Beispiel: Frühstück — 3 Eier als Omelett mit Käse (≈ 30 g). Mittag — 200 g Hähnchen oder Pute mit Nudeln (≈ 50 g). Abend — 250 g körniger Frischkäse mit Tomaten (≈ 33 g). Zusammen rund 113 g; passe die Portionen an dein Ziel an.",
    focus_text: null,
    shopping_hint: "Eier, Hähnchen- oder Putenfilet, körniger Frischkäse.",
  },
  {
    id: "card-06",
    time_tag: "lang",
    energy_tag: "niedrig",
    location_tag: "egal",
    is_reentry_card: false,
    core_action_text: "Heute: leichte Bewegung statt Intensität.",
    core_action_detail:
      "20 Minuten lockeres Spazieren oder sanftes Dehnen — heute kein Krafttraining. Beim Dehnen jede Position 20–30 Sekunden ruhig halten, nie bis in den Schmerz, und gleichmäßig weiteratmen. Ein einfacher Ablauf: Nacken langsam zur Seite neigen (beide Seiten), Schultern kreisen, im Stehen mit geraden Beinen locker Richtung Boden greifen (dehnt die Beinrückseite), dann im Stand einen Fuß zum Po ziehen (Oberschenkelvorderseite). Nicht wippen, nur ruhig halten.",
    core_action_reason:
      "Bei niedriger Energie überwiegt der Erholungsnutzen den Trainingsreiz. Morgen ist wieder ein neuer Tag für mehr Intensität.",
    secondary_text:
      "Auch an ruhigen Tagen hält Protein dich satt und stützt die Erholung. Ziel: {protein_target} g. Unkompliziert: Frühstück — 250 g Magerquark mit Beeren (≈ 30 g). Mittag — 2 Eier und 200 g Hüttenkäse auf Vollkornbrot (≈ 40 g). Abend — 150 g Räucherlachs oder Hähnchenrest mit Salat (≈ 30 g). Rund 100 g — ein Skyr rundet auf.",
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
      "3 Sätze pro Übung, je 10 Wiederholungen, 75 Sekunden Pause. 1) Bankdrücken oder Liegestütz (Brust): Beim Bankdrücken die Hantelstange/Kurzhanteln kontrolliert bis auf Brusthöhe absenken und gerade nach oben drücken; alternativ Liegestütz (Körper bleibt eine gerade Linie). 2) Rudern (Rücken): Am Kabelzug oder vorgebeugt mit Hanteln zum Bauch ziehen, Schulterblätter zusammenführen, langsam zurück. 3) Schulterdrücken (Schultern): Kurzhanteln von Schulterhöhe gerade nach oben drücken, kontrolliert absenken. Das Gewicht so wählen, dass die letzten 2 Wiederholungen fordern, die Technik aber sauber bleibt. Im Zweifel lieber leichter und sauber.",
    core_action_reason:
      "Regelmäßiger Wechsel zwischen Muskelgruppen sorgt für ausgewogenen Aufbau ohne Übertraining einzelner Bereiche.",
    secondary_text:
      "Ziel heute: {protein_target} g Eiweiß. Beispiel-Tag: Frühstück — 300 g Magerquark mit Haferflocken (≈ 40 g). Mittag — 180 g Hähnchenbrust mit Reis (≈ 54 g). Abend — 2 Eier und 150 g Hüttenkäse auf Vollkornbrot (≈ 33 g). Zusammen rund 127 g; passe die Portionen an dein Ziel an.",
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
      "Zieh feste Schuhe an und geh 15 Minuten zügig — so schnell, dass Reden noch geht, Singen aber schwerfallen würde. Lass die Arme locker mitschwingen und halt das Tempo gleichmäßig. Egal wann es heute reinpasst; ein Weg zur Arbeit, zum Bäcker oder einfach um den Block zählt genauso.",
    core_action_reason:
      "Zügiges Gehen ist eine der am besten belegten Alltagsmaßnahmen für Herz, Kreislauf und Energie — ohne Vorbereitung, ohne Equipment.",
    secondary_text:
      "Ziel heute: mind. {protein_target} g Eiweiß, eine Proteinquelle pro Mahlzeit. Beispiel: Frühstück — 250 g Magerquark mit Beeren (≈ 30 g). Mittag — 180 g Hähnchenbrust mit Kartoffeln (≈ 54 g). Abend — 200 g Hüttenkäse mit Vollkornbrot (≈ 30 g). Rund 114 g; passe die Portionen an dein Ziel an.",
    focus_text: null,
    shopping_hint: "Magerquark, Hähnchenbrust, Hüttenkäse.",
  },
];
