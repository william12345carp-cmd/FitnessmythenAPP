/* Wissensbasis: 32 evidenzbasierte Artikel für den Wissen-Tab.
   Struktur pro Artikel: emoji, kategorie (feine Taxonomie), kurzantwort
   (Kernaussage), warumWichtig, erklaerung (einfache Sprache, kein Fachjargon),
   wissenschaft (Beleg), schritte (Umsetzung), typischeFehler, aktion (genau
   eine konkrete Handlung), mythos ({behauptung, wahrheit} bei Mythen-Artikeln,
   sonst null), quellen. */

export const KATEGORIEN = [
  "Alle",
  "Abnehmen",
  "Ernährung",
  "Protein",
  "Kalorien",
  "Krafttraining",
  "Cardio",
  "Psychologie",
  "Schlaf & Stress",
  "Mythen widerlegt",
  "Hunger & Heißhunger",
];

export const ARTIKEL = [
  // ---------- ERNÄHRUNG ----------
  {
    id: "protein-bedarf",
    titel: "Wie viel Protein brauche ich wirklich?",
    kategorie: "Protein",
    emoji: "🥩",
    mythos: null,
    lesezeit: "4 min",
    kurzantwort:
      "Für gesunden Fettabbau bei vollem Muskelerhalt sind 1,6 bis 2,0 g Protein pro Kilogramm Zielgewicht optimal. Das ist mehr, als die meisten Menschen im Alltag essen — und genau das ändert am meisten.",
    warumWichtig:
      "Protein sättigt am längsten, schützt deine Muskeln im Kaloriendefizit und verbrennt sich beim Verdauen teilweise selbst. Es ist der wirksamste Hebel gegen Heißhunger, den es gibt.",
    erklaerung:
      "Dein Körper braucht Energie, um Nahrung zu verdauen. Bei Fett und Kohlenhydraten kostet ihn das kaum etwas. Bei Protein muss er dagegen Schwerstarbeit leisten, um die Aminosäureketten aufzuspalten — dabei verpuffen 25 bis 30 % der Protein-Kalorien direkt als Körperwärme. Außerdem meldet dein Magen erst dann dauerhafte Sättigung, wenn dein Eiweißbedarf für den Tag gedeckt ist.",
    wissenschaft:
      "Metaanalysen zur Proteinzufuhr im Kaloriendefizit zeigen, dass 1,6–2,0 g/kg die Muskelmasse deutlich besser erhalten als niedrigere Mengen, ohne dass mehr Nutzen entsteht. Studien zur Sättigung zeigen zudem, dass ein höherer Proteinanteil den Kalorienverzehr am restlichen Tag automatisch senkt, ganz ohne bewusste Kontrolle.",
    schritte: [
      "Berechne dein Ziel: Zielgewicht in kg × 1,8 = Gramm Protein pro Tag.",
      "Starte den Tag mit einer Proteinquelle, z. B. Skyr, Quark oder Eier.",
      "Verteile das Ziel auf 3–4 Mahlzeiten statt es abends nachzuholen.",
      "Nutze günstige Alltagsquellen: Magerquark, Hüttenkäse, Hähnchenbrust, Linsen, Tofu.",
    ],
    typischeFehler: [
      "Protein nur beim Abendessen, tagsüber fast keins — führt zu Mittags-Tief und Heißhunger.",
      "Teure Proteinriegel kaufen, die eigentlich Schokoriegel mit Etikett sind.",
      "Sich das Proteinziel als Pflicht statt als Sättigungs-Hebel vorstellen.",
    ],
    aktion: "Iss zu deiner nächsten Mahlzeit bewusst eine klar erkennbare Proteinquelle dazu.",
    quellen: [
      "Helms, E. R. et al. (2014): Evidence-based recommendations for natural bodybuilding contest preparation: nutrition.",
      "Weigle, D. S. et al. (2005): A high-protein diet induces sustained reductions in appetite.",
    ],
  },
  {
    id: "kaloriendefizit",
    titel: "Kaloriendefizit: Was es wirklich bedeutet",
    kategorie: "Abnehmen",
    emoji: "🔥",
    mythos: null,
    lesezeit: "4 min",
    kurzantwort:
      "Ein Kaloriendefizit heißt: Du nimmst über einen längeren Zeitraum weniger Energie auf, als du verbrauchst. Das ist die einzige Voraussetzung für Fettabbau — alles andere ist Feintuning.",
    warumWichtig:
      "Viele Diäten scheitern nicht an der Idee, sondern daran, dass Menschen ihr eigenes Defizit falsch einschätzen. Wer die Grundmechanik versteht, hört auf, nach Wundermitteln zu suchen.",
    erklaerung:
      "Dein Körper braucht täglich eine bestimmte Energiemenge, um zu funktionieren — Atmen, Denken, Bewegen. Isst du dauerhaft weniger, als dieser Bedarf beträgt, greift dein Körper auf gespeicherte Energie zurück, hauptsächlich Fett. Das Defizit muss nicht extrem sein: Schon 300–500 kcal täglich weniger reichen für gesunden, nachhaltigen Fortschritt.",
    wissenschaft:
      "Kontrollierte Stoffwechselkammer-Studien bestätigen die Energiebilanz-Gleichung eindeutig: Bei identischem Defizit ist der Fettverlust unabhängig davon, ob die Kalorien aus Kohlenhydraten oder Fett stammen. Gleichzeitig zeigt die Forschung, dass Menschen ihre tatsächliche Zufuhr im Schnitt um 20–30 % unterschätzen (Underreporting).",
    schritte: [
      "Schätze deinen Tagesbedarf grob über dein Zielgewicht und deine Aktivität.",
      "Ziehe 300–500 kcal ab — das reicht für spürbaren, aber verträglichen Fortschritt.",
      "Wiege dich 1× wöchentlich zur gleichen Tageszeit, nicht täglich.",
      "Prüfe nach 2–3 Wochen den Trend, nicht einzelne Tageswerte.",
    ],
    typischeFehler: [
      "Ein zu radikales Defizit wählen, das nach wenigen Tagen zum Abbruch führt.",
      "Flüssige Kalorien (Saft, Milchkaffee, Softdrinks) beim Schätzen vergessen.",
      "Bei Stagnation sofort noch mehr streichen, statt Wasser und Stress zu bedenken.",
    ],
    aktion: "Schätze heute einmal ehrlich deine drei größten Mahlzeiten inklusive Öl und Getränke.",
    quellen: [
      "Hall, K. D. et al. (2016): Energy expenditure and body composition changes after an isocaloric ketogenic diet.",
      "Lichtman, S. W. et al. (1992): Discrepancy between self-reported and actual caloric intake.",
    ],
  },
  {
    id: "kohlenhydrate-nicht-boese",
    titel: "Kohlenhydrate: Warum sie nicht böse sind",
    kategorie: "Ernährung",
    emoji: "🍞",
    mythos: null,
    lesezeit: "3 min",
    kurzantwort:
      "Kohlenhydrate machen nicht per se dick. Sie liefern Energie für Alltag und Training und sind bei richtiger Wahl ein wichtiger Sättigungsfaktor.",
    warumWichtig:
      "Wer Kohlenhydrate komplett verbannt, kämpft meist mit Energielosigkeit und verstärktem Verlangen nach genau dem, was er sich verbietet.",
    erklaerung:
      "Kohlenhydrate sind der bevorzugte Energielieferant deines Körpers, besonders für Gehirn und Muskeln. Der Unterschied liegt in der Qualität: Kartoffeln, Haferflocken, Vollkornprodukte und Hülsenfrüchte kommen mit Ballaststoffen, die lange sättigen. Weißmehl und Zucker liefern Energie ohne diesen Sättigungseffekt und lassen den Blutzucker schneller schwanken.",
    wissenschaft:
      "Hochkontrollierte Vergleichsstudien zwischen Low-Carb- und High-Carb-Ernährung bei gleicher Kalorien- und Proteinzufuhr zeigen identischen Fettabbau. Der anfängliche schnelle Gewichtsverlust bei Low-Carb ist überwiegend Wasser, das mit den Glykogenspeichern gebunden war.",
    schritte: [
      "Bevorzuge komplexe Quellen: Kartoffeln, Reis, Haferflocken, Vollkornprodukte, Hülsenfrüchte.",
      "Kombiniere Kohlenhydrate immer mit einer Proteinquelle für stabile Sättigung.",
      "Nutze Kohlenhydrate gezielt rund um Bewegung für mehr Energie.",
      "Lass dich nicht von kurzfristigen Wasserschwankungen auf der Waage irritieren.",
    ],
    typischeFehler: [
      "Kohlenhydrate komplett streichen und stattdessen zu viel Fett essen.",
      "Vor dem Training nichts essen und sich dann kraftlos fühlen.",
      "Lebensmittel in 'gut' und 'böse' einteilen statt auf die Gesamtbilanz zu achten.",
    ],
    aktion: "Iss deine nächste Kohlenhydrat-Beilage bewusst als Vollkorn- oder Kartoffel-Variante.",
    quellen: [
      "Hall, K. D. et al. (2016): Energy expenditure and body composition changes after an isocaloric ketogenic diet.",
      "Johnston, C. S. et al. (2006): Ketogenic low-carbohydrate diets have no metabolic advantage over nonketogenic low-carbohydrate diets.",
    ],
  },
  {
    id: "fette-welche-brauchst-du",
    titel: "Fette: Welche du brauchst, welche nicht",
    kategorie: "Ernährung",
    emoji: "🥑",
    mythos: null,
    lesezeit: "3 min",
    kurzantwort:
      "Fett ist lebensnotwendig für Hormone und Vitaminaufnahme — aber mit 9 kcal pro Gramm auch die energiedichteste Nährstoffgruppe. Qualität und Menge entscheiden.",
    warumWichtig:
      "Fett wird oft entweder komplett gemieden oder unbewusst literweise mitgegessen (Öl, Saucen, Käse). Beides sabotiert dein Ziel auf unterschiedliche Weise.",
    erklaerung:
      "Dein Körper braucht Fett, um fettlösliche Vitamine (A, D, E, K) aufzunehmen und Hormone zu bilden. Ungesättigte Fette aus Olivenöl, Nüssen und Fisch sind dabei wertvoller als gesättigte Fette aus verarbeiteten Produkten. Das eigentliche Problem im Alltag ist meist nicht zu wenig, sondern unbemerkt zu viel Fett — ein Esslöffel Öl hat bereits 120 kcal.",
    wissenschaft:
      "Ernährungsrichtlinien empfehlen 20–35 % der Kalorien aus Fett, mit Fokus auf ungesättigte Quellen. Studien zu Omega-3-Fettsäuren aus fettem Fisch zeigen positive Effekte auf Herz-Kreislauf-Gesundheit und Entzündungswerte.",
    schritte: [
      "Miss Kochöl bewusst mit dem Löffel statt aus der Flasche zu gießen.",
      "Bevorzuge Olivenöl, Rapsöl, Nüsse und fetten Fisch als Hauptquellen.",
      "Reduziere versteckte Fette in Wurst, Saucen und Fertigprodukten.",
      "Iss 1–2× pro Woche fetten Fisch für Omega-3-Fettsäuren.",
    ],
    typischeFehler: [
      "Fett komplett meiden aus Angst, es mache automatisch dick.",
      "Kochöl unkontrolliert aus der Flasche in die Pfanne gießen.",
      "Fettarme Produkte kaufen, die den fehlenden Geschmack mit Zucker ausgleichen.",
    ],
    aktion: "Miss dein Kochöl heute einmal mit einem Löffel ab, statt es zu schätzen.",
    quellen: [
      "Mozaffarian, D. & Wu, J. H. Y. (2011): Omega-3 fatty acids and cardiovascular disease.",
      "Institute of Medicine (2005): Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat.",
    ],
  },
  {
    id: "ballaststoffe-unterschaetzt",
    titel: "Ballaststoffe: Warum sie unterschätzt werden",
    kategorie: "Ernährung",
    emoji: "🌾",
    mythos: null,
    lesezeit: "3 min",
    kurzantwort:
      "Ballaststoffe sättigen ohne nennenswerte Kalorien, stabilisieren den Blutzucker und pflegen deinen Darm. Die meisten Menschen essen weniger als die Hälfte der empfohlenen Menge.",
    warumWichtig:
      "Ballaststoffe sind der einfachste Weg, mehr Volumen und Sättigung auf den Teller zu bringen, ohne die Kalorien nach oben zu treiben.",
    erklaerung:
      "Ballaststoffe sind unverdauliche Pflanzenbestandteile, die den Magen dehnen, die Verdauung verlangsamen und den Blutzuckeranstieg nach dem Essen abbremsen. Das hält länger satt als kalorienreiche, ballaststoffarme Lebensmittel wie Weißbrot oder Süßigkeiten.",
    wissenschaft:
      "Eine große Übersichtsarbeit im Fachjournal The Lancet zeigt, dass eine höhere Ballaststoffzufuhr mit niedrigerem Körpergewicht, besseren Blutzuckerwerten und geringerem Risiko für Herz-Kreislauf-Erkrankungen einhergeht.",
    schritte: [
      "Baue bei jeder Hauptmahlzeit Gemüse oder Hülsenfrüchte ein.",
      "Wechsle Weißmehlprodukte gegen Vollkornvarianten.",
      "Iss Obst statt Fruchtsaft — die Ballaststoffe bleiben erhalten.",
      "Steigere die Menge langsam, damit sich dein Darm daran gewöhnt.",
    ],
    typischeFehler: [
      "Zu schnell zu viel Ballaststoffe essen und mit Blähungen reagieren.",
      "Säfte und Smoothies mit ganzem Obst gleichsetzen.",
      "Vollkornprodukte an der Verpackungsfarbe statt an der Zutatenliste erkennen wollen.",
    ],
    aktion: "Tausche heute eine Beilage gegen die Vollkorn-Variante.",
    quellen: [
      "Reynolds, A. et al. (2019): Carbohydrate quality and human health: a series of systematic reviews and meta-analyses (The Lancet).",
    ],
  },
  {
    id: "wasser-bedarf",
    titel: "Wasser: Wie viel du wirklich brauchst",
    kategorie: "Ernährung",
    emoji: "💧",
    mythos: null,
    lesezeit: "2 min",
    kurzantwort:
      "Als grobe Richtschnur gelten 30–35 ml pro Kilogramm Körpergewicht täglich, mehr bei Hitze oder Sport. Wichtiger als die exakte Zahl: regelmäßig trinken, bevor Durst entsteht.",
    warumWichtig:
      "Durst wird oft mit Hunger verwechselt. Ausreichend Wasser ist einer der einfachsten Hebel gegen unnötiges Snacking.",
    erklaerung:
      "Dein Körper signalisiert Flüssigkeitsmangel oft undeutlich — als Müdigkeit, Kopfschmerz oder eben Appetit. Wasser vor Mahlzeiten dehnt zusätzlich den Magen und unterstützt das Sättigungsgefühl, völlig ohne Kalorien.",
    wissenschaft:
      "Studien zu Wasser vor Mahlzeiten zeigen eine leicht reduzierte Kalorienaufnahme in der Folge-Mahlzeit. Übersichtsarbeiten zu Flüssigkeitszufuhr und Gewichtsmanagement bestätigen einen unterstützenden, wenn auch moderaten Effekt.",
    schritte: [
      "Trinke direkt nach dem Aufstehen ein großes Glas Wasser.",
      "Stelle eine Flasche sichtbar an deinen Arbeitsplatz.",
      "Trinke ein Glas Wasser, bevor du zu einem Snack greifst.",
      "Achte bei Hitze und Sport auf spürbar mehr Flüssigkeit.",
    ],
    typischeFehler: [
      "Durst dauerhaft als Hunger fehlinterpretieren.",
      "Nur beim Essen trinken, sonst den ganzen Tag kaum Flüssigkeit.",
      "Kalorienhaltige Getränke (Saft, Softdrinks) als Flüssigkeitszufuhr zählen.",
    ],
    aktion: "Trink jetzt sofort ein großes Glas Wasser.",
    quellen: [
      "Popkin, B. M. et al. (2010): Water, hydration, and health.",
      "Dennis, E. A. et al. (2010): Water consumption increases weight loss during a hypocaloric diet intervention.",
    ],
  },
  {
    id: "restaurant-gesund-essen",
    titel: "Gesund essen im Restaurant – so geht's",
    kategorie: "Ernährung",
    emoji: "🍽️",
    mythos: null,
    lesezeit: "3 min",
    kurzantwort:
      "Du musst beim Essengehen nicht verzichten. Mit wenigen bewussten Entscheidungen bleibt eine Restaurant-Mahlzeit problemlos im Rahmen.",
    warumWichtig:
      "Die Angst vor dem 'unkontrollierbaren' Restaurantbesuch führt oft dazu, dass soziale Anlässe gemieden werden. Das ist auf Dauer weder nötig noch gesund.",
    erklaerung:
      "Restaurant-Gerichte enthalten oft mehr Öl, Sauce und Portionsgröße als selbst gekocht — nicht mehr Geschmack braucht das automatisch nicht. Ein paar einfache Fragen an die Bedienung und bewusste Auswahl reichen meist aus, um eine ausgewogene Mahlzeit zu bekommen.",
    wissenschaft:
      "Untersuchungen zu Portionsgrößen in der Gastronomie zeigen, dass Restaurant-Portionen im Schnitt deutlich größer sind als empfohlene Verzehrmengen — ein wesentlicher, oft unbemerkter Faktor für Kalorienüberschuss beim Essengehen.",
    schritte: [
      "Wähle eine erkennbare Proteinquelle als Hauptbestandteil (Fisch, Fleisch, Tofu).",
      "Frage nach Sauce separat, statt sie über das Gericht gießen zu lassen.",
      "Fülle die Hälfte des Tellers gedanklich mit Gemüse.",
      "Iss langsam und höre auf, wenn du satt bist — die Portion muss nicht leer sein.",
    ],
    typischeFehler: [
      "Aus Höflichkeit den Teller leer essen, obwohl die Sättigung längst da ist.",
      "Vorspeise, Brot und Dessert automatisch mitbestellen.",
      "Kalorienreiche Cocktails oder Softdrinks unbedacht dazu trinken.",
    ],
    aktion: "Bestelle beim nächsten Restaurantbesuch die Sauce separat dazu.",
    quellen: ["Young, L. R. & Nestle, M. (2002): The contribution of expanding portion sizes to the US obesity epidemic."],
  },
  {
    id: "kalorien-schaetzen-ohne-app",
    titel: "Kalorien schätzen ohne App",
    kategorie: "Kalorien",
    emoji: "🖐️",
    mythos: null,
    lesezeit: "3 min",
    kurzantwort:
      "Mit ein paar Faustregeln und Handmaßen lässt sich eine Mahlzeit erstaunlich gut einschätzen — ganz ohne Waage oder App.",
    warumWichtig:
      "Tracking-Apps sind hilfreich, aber nicht jeder will oder kann dauerhaft alles wiegen. Ein grobes Gefühl für Portionsgrößen reicht im Alltag oft aus.",
    erklaerung:
      "Deine Hand ist ein guter, immer verfügbarer Maßstab: Eine Handfläche Protein entspricht etwa 100–120 g, eine Faust Gemüse etwa einer Portion, eine hohle Hand Kohlenhydrate etwa 150–200 g gekocht, ein Daumen Fett etwa einem Esslöffel Öl.",
    wissenschaft:
      "Handbasierte Portionsschätzungen korrelieren in Validierungsstudien gut genug mit tatsächlichen Grammangaben, um im Alltag als praktikable Orientierung zu dienen — deutlich genauer als reines Augenmaß ohne Referenz.",
    schritte: [
      "Baue jede Mahlzeit nach dem Handmaß auf: 1 Handfläche Protein, 1 Faust Gemüse, 1 hohle Hand Kohlenhydrate.",
      "Nutze einen Daumen als Referenz für Öl und Fett.",
      "Wiege zu Beginn ein paar typische Lebensmittel einmal ab, um ein Gefühl zu bekommen.",
      "Vertraue nach der Eingewöhnung deinem Augenmaß.",
    ],
    typischeFehler: [
      "Öl und Saucen beim Schätzen komplett vergessen.",
      "Nur die Hauptmahlzeiten schätzen, Snacks aber nicht mitzählen.",
      "Sich von der Genauigkeit einer App abhängig machen, statt ein eigenes Gefühl zu entwickeln.",
    ],
    aktion: "Schätze deine nächste Mahlzeit einmal bewusst mit der Handmaß-Methode.",
    quellen: ["Livingstone, M. B. E. & Black, A. E. (2003): Markers of the validity of reported energy intake."],
  },

  // ---------- TRAINING ----------
  {
    id: "krafttraining-warum",
    titel: "Krafttraining: Warum jeder es braucht",
    kategorie: "Krafttraining",
    emoji: "🏋️",
    mythos: null,
    lesezeit: "3 min",
    kurzantwort:
      "Krafttraining schützt deine Muskeln im Kaloriendefizit, stärkt Knochen und Gelenke und verbessert deinen Alltag spürbar — unabhängig vom Alter.",
    warumWichtig:
      "Wer nur Kalorien reduziert, ohne die Muskulatur zu reizen, verliert neben Fett auch wertvolle Muskelmasse — und wirkt am Ende schlaff statt straff.",
    erklaerung:
      "Muskeln sind aktives Gewebe: Sie verbrennen auch in Ruhe Energie und stabilisieren Gelenke. Ab dem 30. Lebensjahr verlieren untrainierte Menschen ohne Gegensteuern jährlich Muskelmasse. Krafttraining setzt genau hier den nötigen Reiz zum Erhalt.",
    wissenschaft:
      "Studien zu Widerstandstraining zeigen erhöhte Knochendichte, verbesserte Insulinsensitivität und einen Erhalt der fettfreien Masse — Effekte, die reines Kaloriensparen ohne Training nicht liefert.",
    schritte: [
      "Starte mit 2–3 Einheiten pro Woche, je 20–30 Minuten reichen zu Beginn.",
      "Fokussiere Grundübungen: Kniebeuge, Liegestütz, Rudern.",
      "Steigere dich langsam über mehr Wiederholungen, dann mehr Gewicht.",
      "Plane feste Trainingstage fest in deine Woche ein.",
    ],
    typischeFehler: [
      "Denken, Krafttraining sei nur für Bodybuilder.",
      "Aus Angst vor 'zu breiten' Muskeln komplett darauf verzichten.",
      "Bei leichten Gelenkbeschwerden Training ganz meiden statt anzupassen.",
    ],
    aktion: "Plane für diese Woche einen konkreten Trainingstermin fest ein.",
    quellen: [
      "Westcott, W. L. (2012): Resistance training is medicine: effects of strength training on health.",
      "McLeod, J. C. et al. (2019): Resistance training as a countermeasure against sarcopenia.",
    ],
  },
  {
    id: "progressive-overload",
    titel: "Progressive Overload: Das Prinzip hinter allem Muskelaufbau",
    kategorie: "Krafttraining",
    emoji: "📈",
    mythos: null,
    lesezeit: "3 min",
    kurzantwort:
      "Dein Körper passt sich nur an, wenn die Belastung stetig steigt. Ohne diese kleine, kontinuierliche Steigerung stagniert jeder Trainingsfortschritt.",
    warumWichtig:
      "Viele trainieren monatelang mit exakt demselben Gewicht und wundern sich, warum nichts passiert. Das Prinzip dahinter zu verstehen erklärt genau das.",
    erklaerung:
      "Wenn du immer dieselbe Last hebst, hat dein Körper keinen Grund, sich zu verändern. Schon eine zusätzliche Wiederholung, ein kleines Plus an Gewicht oder eine kürzere Pause reichen als neuer Reiz aus, um Anpassung anzustoßen.",
    wissenschaft:
      "Untersuchungen zur Trainingsprogression zeigen, dass kontinuierliche, auch kleine Laststeigerungen über Wochen zu messbarem Kraft- und Muskelzuwachs führen, während konstante Belastung schnell zur Stagnation führt.",
    schritte: [
      "Notiere dir bei jedem Training Gewicht und Wiederholungen.",
      "Versuche in der Folgewoche eine Wiederholung mehr zu schaffen.",
      "Erhöhe das Gewicht erst, wenn die obere Wiederholungszahl sauber gelingt.",
      "Erlaube dir auch mal Plateau-Wochen ohne Frust.",
    ],
    typischeFehler: [
      "Jedes Training identisch zur letzten Einheit ausführen.",
      "Gewicht zu schnell steigern und dabei die Technik verlieren.",
      "Nur das Gewicht als einzige Stellschraube sehen, statt auch Wiederholungen oder Pausen zu nutzen.",
    ],
    aktion: "Notiere dir bei deinem nächsten Training zum ersten Mal Gewicht und Wiederholungen.",
    quellen: [
      "Schoenfeld, B. J. et al. (2017): Dose-response relationship between weekly resistance training volume and muscle mass.",
      "Garber, C. E. et al. (2011): Quantity and quality of exercise for developing fitness (ACSM Position Stand).",
    ],
  },
  {
    id: "trainingshaeufigkeit",
    titel: "Wie oft pro Woche trainieren?",
    kategorie: "Krafttraining",
    emoji: "📅",
    mythos: null,
    lesezeit: "3 min",
    kurzantwort:
      "Für spürbare Fortschritte reichen 2–3 Krafttrainingseinheiten pro Woche völlig aus. Regelmäßigkeit über Monate zählt mehr als Häufigkeit in einer einzelnen Woche.",
    warumWichtig:
      "Die Angst, 'nicht genug' zu trainieren, hält viele davon ab, überhaupt anzufangen. Weniger, aber konstant schlägt viel und unregelmäßig.",
    erklaerung:
      "Zwischen zwei Einheiten für dieselbe Muskelgruppe sollten mindestens 48 Stunden liegen, damit sich das Gewebe erholen kann. Bei 2–3 Ganzkörpereinheiten pro Woche ist das automatisch gegeben, ohne dass du dir Gedanken über einen Trainingsplit machen musst.",
    wissenschaft:
      "Vergleichsstudien zur Trainingshäufigkeit zeigen keinen relevanten Zusatznutzen von mehr als 3–4 Einheiten pro Woche für Freizeitsportler — entscheidend ist die über Monate gehaltene Konsistenz.",
    schritte: [
      "Lege 2–3 feste Wochentage für Ganzkörpertraining fest.",
      "Plane mindestens einen Tag Pause zwischen den Einheiten ein.",
      "Bevorzuge kürzere, regelmäßige Einheiten vor seltenen Mammut-Sessions.",
      "Passe die Anzahl bei Zeitmangel lieber an, als ganz auszusetzen.",
    ],
    typischeFehler: [
      "Erst starten, wenn 'genug Zeit für 5x/Woche' da ist — und dadurch nie anfangen.",
      "Nach einer verpassten Einheit die ganze Woche abschreiben.",
      "Ohne Erholungstage täglich dieselben Muskeln belasten.",
    ],
    aktion: "Trage jetzt 2 feste Trainingstermine für diese Woche in deinen Kalender ein.",
    quellen: ["Ralston, G. W. et al. (2017): Weekly training frequency effects on strength gain: a meta-analysis."],
  },
  {
    id: "home-workout-ohne-geraete",
    titel: "Home Workout ohne Geräte – was wirklich funktioniert",
    kategorie: "Krafttraining",
    emoji: "🏠",
    mythos: null,
    lesezeit: "3 min",
    kurzantwort:
      "Mit dem eigenen Körpergewicht lässt sich ein wirksames Ganzkörpertraining gestalten — kein Fitnessstudio nötig, um echte Fortschritte zu machen.",
    warumWichtig:
      "Fehlende Zeit oder Anfahrt zum Studio ist einer der häufigsten Gründe, Training ausfallen zu lassen. Zuhause trainieren entfernt diese Hürde komplett.",
    erklaerung:
      "Übungen wie Kniebeuge, Liegestütz, Ausfallschritte und Plank trainieren alle wichtigen Muskelgruppen ohne Zusatzgewicht. Progression gelingt über mehr Wiederholungen, langsameres Tempo oder schwierigere Varianten (z. B. einbeinig).",
    wissenschaft:
      "Studien zu Körpergewichtstraining zeigen vergleichbare Kraft- und Muskelzuwächse wie Training mit Geräten, solange die Belastung nah genug an die individuelle Leistungsgrenze herangeführt wird.",
    schritte: [
      "Wähle je eine Übung für Beine, Drücken, Ziehen und Rumpf.",
      "Steigere die Schwierigkeit über Wiederholungen, bevor du Varianten wechselst.",
      "Nutze einen Rucksack mit Büchern als improvisiertes Zusatzgewicht.",
      "Plane feste 20–25 Minuten, statt auf 'perfekte Bedingungen' zu warten.",
    ],
    typischeFehler: [
      "Denken, ohne Geräte sei kein echter Fortschritt möglich.",
      "Zu schnell zu schwere Varianten wählen und die Technik verlieren.",
      "Kein Ziel für die Progression haben und immer gleich trainieren.",
    ],
    aktion: "Führe heute 3 Sätze Kniebeugen mit deinem eigenen Körpergewicht aus.",
    quellen: ["Kikuchi, N. & Nakazato, K. (2017): Low-load bodyweight training and muscular adaptation."],
  },
  {
    id: "aufwaermen",
    titel: "Aufwärmen: Warum und wie (2 Minuten reichen)",
    kategorie: "Krafttraining",
    emoji: "🔄",
    mythos: null,
    lesezeit: "2 min",
    kurzantwort:
      "Ein kurzes, dynamisches Aufwärmen bereitet Gelenke und Muskeln vor und senkt das Verletzungsrisiko — mehr als 2–3 Minuten braucht es dafür meist nicht.",
    warumWichtig:
      "Unaufgewärmt schwer zu trainieren erhöht das Risiko für kleinere Zerrungen und fühlt sich unnötig schwer an.",
    erklaerung:
      "Aufwärmen erhöht die Muskeltemperatur und bereitet Nervensystem und Gelenke auf die Belastung vor. Dynamische Bewegungen wie Armkreisen oder ein paar leichte Wiederholungen der ersten Übung reichen aus — langes statisches Dehnen vorher ist dagegen eher hinderlich.",
    wissenschaft:
      "Übersichtsarbeiten zeigen, dass dynamisches Aufwärmen die Leistungsfähigkeit verbessert, während langes statisches Dehnen unmittelbar vor Kraftbelastung die Schnellkraft leicht mindern kann.",
    schritte: [
      "Mobilisiere 1–2 Minuten die Gelenke, die du gleich belastest.",
      "Führe die erste Übung zunächst mit leichterem Gewicht oder weniger Tiefe aus.",
      "Steigere dich Satz für Satz zur eigentlichen Trainingslast.",
      "Verzichte auf langes statisches Dehnen direkt vor dem Training.",
    ],
    typischeFehler: [
      "Komplett unaufgewärmt mit dem schwersten Satz beginnen.",
      "Sich durch langes Cardio vor dem Krafttraining bereits erschöpfen.",
      "Langes statisches Dehnen als Aufwärmen missverstehen.",
    ],
    aktion: "Mach vor deinem nächsten Training 2 Minuten lockeres Mobilisieren, bevor du startest.",
    quellen: ["Fradkin, A. J. et al. (2010): Effects of warming up on physical performance: a systematic review."],
  },
  {
    id: "regeneration",
    titel: "Regeneration: Warum Pausen Muskeln bauen",
    kategorie: "Krafttraining",
    emoji: "😴",
    mythos: null,
    lesezeit: "3 min",
    kurzantwort:
      "Muskeln wachsen nicht im Training, sondern in der Erholung danach — vor allem im Schlaf. Wer keine Pausen einplant, blockiert seinen eigenen Fortschritt.",
    warumWichtig:
      "Ständiges Training ohne Erholung führt zu Erschöpfung statt Fortschritt und erhöht das Verletzungsrisiko.",
    erklaerung:
      "Training setzt kleine Reize in der Muskulatur. Repariert und gestärkt wird sie erst in den Ruhephasen danach, besonders im Tiefschlaf, wenn vermehrt Wachstumshormone ausgeschüttet werden. Ohne diese Pausen bleibt der Trainingsreiz ohne Wirkung.",
    wissenschaft:
      "Untersuchungen zu Schlaf und Muskelregeneration zeigen erhöhte Ausschüttung von Wachstumshormon in Tiefschlafphasen sowie einen Anstieg des Stresshormons Cortisol bei chronischem Schlafmangel, was Muskelabbau begünstigt.",
    schritte: [
      "Plane mindestens 48 Stunden Pause für dieselbe Muskelgruppe ein.",
      "Priorisiere 7–8 Stunden Schlaf als Teil deines Trainingsplans.",
      "Iss auch an trainingsfreien Tagen ausreichend Protein.",
      "Achte auf Warnsignale wie anhaltende Müdigkeit oder Gelenkschmerzen.",
    ],
    typischeFehler: [
      "Täglich dieselben Muskeln ohne Pause trainieren.",
      "Schlaf als 'verschwendete Zeit' gegenüber zusätzlichem Training betrachten.",
      "Alkohol direkt nach dem Training trinken, was die Regeneration hemmt.",
    ],
    aktion: "Plane für heute Abend 30 Minuten früher ins Bett zu gehen als sonst.",
    quellen: ["Dattilo, M. et al. (2011): Sleep and muscle recovery: endocrinological and molecular perspectives."],
  },

  // ---------- CARDIO ----------
  {
    id: "zone-2-training",
    titel: "Zone 2: Das unterschätzte Fettverbrennungs-Training",
    kategorie: "Cardio",
    emoji: "🚶",
    mythos: null,
    lesezeit: "3 min",
    kurzantwort:
      "Zone 2 ist lockeres, aber stetiges Ausdauertraining, bei dem du dich noch problemlos unterhalten kannst. Es verbessert die Fettverbrennung und Grundfitness, ohne stark zu belasten.",
    warumWichtig:
      "Viele denken, Cardio müsse hart und schweißtreibend sein, um zu wirken. Zone-2-Training zeigt, dass moderates, regelmäßiges Bewegen mindestens genauso wertvoll ist.",
    erklaerung:
      "In Zone 2 arbeitet dein Körper vorwiegend mit Sauerstoff und nutzt bevorzugt Fett als Energiequelle. Das lässt sich einfach über den Sprech-Test prüfen: Du solltest dich noch in ganzen Sätzen unterhalten können, ohne außer Atem zu geraten.",
    wissenschaft:
      "Forschung zu moderatem Ausdauertraining zeigt eine verbesserte mitochondriale Funktion und Fettstoffwechselkapazität — Anpassungen, die die Grundlage für effizientere Energieverwertung im Alltag bilden.",
    schritte: [
      "Wähle eine Aktivität, die du locker 30–45 Minuten durchhältst: Gehen, Radfahren, Schwimmen.",
      "Halte ein Tempo, bei dem du dich noch normal unterhalten kannst.",
      "Baue 2–3 solcher Einheiten pro Woche in deinen Alltag ein.",
      "Steigere die Dauer, nicht zwingend das Tempo.",
    ],
    typischeFehler: [
      "Jede Cardio-Einheit unbewusst zu intensiv angehen.",
      "Zone-2-Training als 'zu leicht, um zu wirken' abtun.",
      "Keine feste Zeit dafür einplanen und es dadurch ausfallen lassen.",
    ],
    aktion: "Geh heute 30 Minuten in einem Tempo, bei dem du dich noch problemlos unterhalten kannst.",
    quellen: ["San-Millán, I. & Brooks, G. A. (2018): Assessment of metabolic flexibility by measuring lactate."],
  },
  {
    id: "hiit-wann-sinnvoll",
    titel: "HIIT: Wann es wirklich sinnvoll ist",
    kategorie: "Cardio",
    emoji: "⚡",
    mythos: null,
    lesezeit: "3 min",
    kurzantwort:
      "Hochintensives Intervalltraining spart Zeit und verbessert die Fitness effizient — ist aber kein Ersatz für Grundlagenausdauer oder Krafttraining, sondern eine sinnvolle Ergänzung.",
    warumWichtig:
      "HIIT wird oft als die überlegene Trainingsform vermarktet. Für wenig Zeit ist es effektiv, aber es ersetzt nicht alle anderen Trainingsformen.",
    erklaerung:
      "Bei HIIT wechseln sich kurze, intensive Belastungsphasen mit Erholungsphasen ab, etwa 30 Sekunden schnell laufen, 90 Sekunden gehen. Das verbessert die Herz-Kreislauf-Fitness in kurzer Zeit deutlich, belastet aber auch stärker als moderates Training.",
    wissenschaft:
      "Studien zu HIIT zeigen vergleichbare Verbesserungen der aeroben Kapazität wie längeres moderates Training bei deutlich kürzerer Gesamtdauer — allerdings bei höherer wahrgenommener Anstrengung und Erholungsbedarf.",
    schritte: [
      "Nutze HIIT höchstens 1–2× pro Woche, nicht täglich.",
      "Wärme dich vor HIIT gründlicher auf als vor lockerem Cardio.",
      "Wähle ein Verhältnis von Belastung zu Pause wie 1:2 oder 1:3 als Einstieg.",
      "Kombiniere HIIT mit, statt es gegen Krafttraining und Zone 2 zu tauschen.",
    ],
    typischeFehler: [
      "HIIT täglich machen und dadurch nicht ausreichend regenerieren.",
      "HIIT als einzige Trainingsform ohne Kraft- oder Grundlagenausdauer nutzen.",
      "Unaufgewärmt direkt in die volle Intensität starten.",
    ],
    aktion: "Plane für diese Woche höchstens eine HIIT-Einheit von 15 Minuten ein.",
    quellen: ["Gibala, M. J. et al. (2012): Physiological adaptations to low-volume, high-intensity interval training."],
  },
  {
    id: "8000-schritte",
    titel: "8.000 Schritte täglich: Warum das reicht",
    kategorie: "Cardio",
    emoji: "👟",
    mythos: null,
    lesezeit: "2 min",
    kurzantwort:
      "Die oft zitierten 10.000 Schritte sind kein wissenschaftlich hergeleiteter Grenzwert. Bereits 7.000–8.000 Schritte pro Tag sind mit deutlich geringerem Sterberisiko verbunden.",
    warumWichtig:
      "Die 10.000er-Marke wirkt für viele unerreichbar und demotivierend. Ein realistisches Ziel wird eher tatsächlich verfolgt.",
    erklaerung:
      "Alltagsbewegung — Treppen statt Aufzug, ein Spaziergang in der Mittagspause, zu Fuß einkaufen — summiert sich über den Tag. Diese Bewegung verbrennt Kalorien, ohne dass sie sich wie 'Sport' anfühlt, und ist damit besonders alltagstauglich.",
    wissenschaft:
      "Große Kohortenstudien zu Schrittzahl und Sterblichkeit zeigen den größten gesundheitlichen Nutzen zwischen 0 und rund 7.000–8.000 Schritten täglich; darüber hinaus flacht der zusätzliche Nutzen deutlich ab.",
    schritte: [
      "Baue kurze Spaziergänge fest in deinen Tag ein, z. B. nach dem Mittagessen.",
      "Nutze Treppen statt Aufzug, wo es möglich ist.",
      "Steige eine Station früher aus Bus oder Bahn.",
      "Tracke deine Schritte eine Woche lang, um deinen Ist-Zustand kennenzulernen.",
    ],
    typischeFehler: [
      "Sich an starren 10.000 Schritten orientieren und bei Nichterreichen frustriert aufgeben.",
      "Bewegung nur als geplanten 'Sporttermin' verstehen, nicht als Alltagsintegration.",
      "Bei wenig Zeit ganz auf Bewegung verzichten statt kleine Einheiten einzubauen.",
    ],
    aktion: "Geh heute nach einer Mahlzeit einen 10-minütigen Spaziergang.",
    quellen: ["Paluch, A. E. et al. (2022): Daily steps and all-cause mortality: a meta-analysis of 15 international cohorts."],
  },

  // ---------- PSYCHOLOGIE ----------
  {
    id: "motivation-gewohnheiten",
    titel: "Motivation ist überschätzt – Gewohnheiten nicht",
    kategorie: "Psychologie",
    emoji: "🧠",
    mythos: null,
    lesezeit: "3 min",
    kurzantwort:
      "Motivation ist ein Gefühl, das kommt und geht. Gewohnheiten laufen automatisch, auch an Tagen ohne Motivation — und genau darauf solltest du bauen.",
    warumWichtig:
      "Wer auf Motivation wartet, um gesund zu essen oder zu trainieren, wird zwangsläufig immer wieder aussetzen. Gewohnheiten machen dich unabhängig von der Tagesform.",
    erklaerung:
      "Eine Gewohnheit entsteht, wenn eine Handlung so oft mit demselben Auslöser wiederholt wird, dass sie kaum noch bewusste Entscheidung braucht. Anfangs kostet das Willenskraft, mit der Zeit wird es automatisch — wie Zähneputzen.",
    wissenschaft:
      "Forschung zur Gewohnheitsbildung zeigt, dass es im Schnitt rund zwei Monate braucht, bis eine neue Handlung automatisiert abläuft — mit großer individueller Bandbreite, je nach Komplexität der Handlung.",
    schritte: [
      "Verknüpfe die neue Handlung mit einer bestehenden Routine (z. B. Wasser trinken direkt nach dem Aufstehen).",
      "Mach den Einstieg absichtlich klein und leicht erreichbar.",
      "Wiederhole die Handlung möglichst am gleichen Ort und zur gleichen Zeit.",
      "Erwarte die ersten Wochen bewusste Anstrengung, nicht sofortige Leichtigkeit.",
    ],
    typischeFehler: [
      "Auf den 'richtigen' Motivations-Moment warten, statt einfach klein zu starten.",
      "Zu viele neue Gewohnheiten gleichzeitig aufbauen wollen.",
      "Nach einem ausgelassenen Tag die ganze Routine für beendet erklären.",
    ],
    aktion: "Verknüpfe eine neue kleine Gewohnheit direkt mit einer bestehenden Routine von heute.",
    quellen: ["Lally, P. et al. (2010): How are habits formed: Modelling habit formation in the real world."],
  },
  {
    id: "emotionales-essen",
    titel: "Emotionales Essen: Erkennen und unterbrechen",
    kategorie: "Psychologie",
    emoji: "💭",
    mythos: null,
    lesezeit: "3 min",
    kurzantwort:
      "Emotionales Essen ist der Versuch, Gefühle wie Stress, Langeweile oder Einsamkeit mit Essen zu regulieren. Der erste Schritt ist, den Unterschied zu echtem Hunger zu erkennen.",
    warumWichtig:
      "Wer Essen als einziges Ventil für schwierige Gefühle nutzt, gerät in einen Kreislauf, der sich mit reiner Disziplin kaum durchbrechen lässt.",
    erklaerung:
      "Echter, körperlicher Hunger baut sich langsam auf und lässt sich mit fast jedem Essen stillen. Emotionaler Hunger kommt plötzlich, verlangt nach bestimmten Lebensmitteln und bleibt auch nach dem Essen oft von einem schlechten Gefühl begleitet.",
    wissenschaft:
      "Studien zu emotionalem Essverhalten zeigen, dass Stress über das Hormon Cortisol den Appetit auf energiereiche, süße und fettige Nahrung erhöht — ein biologischer Mechanismus, kein Charakterfehler.",
    schritte: [
      "Frag dich beim Griff zum Essen: Körperlicher Hunger oder ein Gefühl, das reguliert werden will?",
      "Baue eine kalorienfreie Alternative auf: kurzer Spaziergang, Anruf, Atemübung.",
      "Schaffe physische Distanz zu Snacks in stressigen Momenten.",
      "Notiere über eine Woche, wann emotionales Essen auftritt, um Muster zu erkennen.",
    ],
    typischeFehler: [
      "Sich für emotionales Essen selbst verurteilen, statt die Ursache zu betrachten.",
      "Süßigkeiten in Sichtweite am Arbeitsplatz aufbewahren.",
      "Mahlzeiten aus Zeitdruck auslassen, was abendliches emotionales Essen begünstigt.",
    ],
    aktion: "Frag dich beim nächsten Snack-Impuls bewusst: Ist das körperlicher Hunger?",
    quellen: ["Epel, E. et al. (2001): Stress may add bite to appetite in women: cortisol and eating behavior."],
  },
  {
    id: "rueckfaelle-normal",
    titel: "Rückfälle sind normal – so gehst du damit um",
    kategorie: "Psychologie",
    emoji: "🔁",
    mythos: null,
    lesezeit: "3 min",
    kurzantwort:
      "Ein Ausrutscher macht dich nicht dick. Erst die Reaktion darauf — Aufgeben oder normal weitermachen — entscheidet über den langfristigen Erfolg.",
    warumWichtig:
      "Der 'Jetzt ist eh alles egal'-Gedanke nach einem Ausrutscher richtet mehr Schaden an als der Ausrutscher selbst.",
    erklaerung:
      "Ein einzelner Tag über dem Kalorienbedarf verändert dein Gewicht kaum messbar. Das Problem entsteht erst, wenn aus einem Ausrutscher tagelanges 'Aufgeben' wird. Wer sich selbst schnell verzeiht, macht erwiesenermaßen konsequenter weiter.",
    wissenschaft:
      "Die psychologische Forschung beschreibt dieses Muster als 'What-the-hell-Effekt': Studien zeigen, dass Selbstmitgefühl nach einem Rückfall mit besserer Fortführung des Vorhabens einhergeht als Selbstkritik.",
    schritte: [
      "Akzeptiere den Ausrutscher, ohne ihn zu dramatisieren.",
      "Iss zur nächsten Mahlzeit ganz normal weiter — kein Hungern zur Kompensation.",
      "Meide die Waage für ein paar Tage, bis sich Wasser normalisiert hat.",
      "Frag dich, was den Rückfall ausgelöst hat, um beim nächsten Mal vorbereitet zu sein.",
    ],
    typischeFehler: [
      "Nach einem Ausrutscher hungern oder exzessiv Sport treiben.",
      "Sich tagelang schuldig fühlen, statt einfach weiterzumachen.",
      "Einen einzelnen Tag als Beweis für generelles Scheitern werten.",
    ],
    aktion: "Iss deine nächste Mahlzeit ganz normal, egal was gestern war.",
    quellen: ["Polivy, J. & Herman, C. P. (1985): Dieting and bingeing: a causal analysis."],
  },
  {
    id: "perfektionismus-sabotage",
    titel: "Perfektionismus sabotiert dein Ziel",
    kategorie: "Psychologie",
    emoji: "🎯",
    mythos: null,
    lesezeit: "3 min",
    kurzantwort:
      "Der Anspruch, alles perfekt zu machen, führt oft dazu, nach dem ersten kleinen Fehler ganz aufzuhören. Gute Umsetzung schlägt perfekte Theorie.",
    warumWichtig:
      "Wer nur 'alles oder nichts' kennt, gibt nach der ersten Abweichung häufig komplett auf — obwohl 80 % richtig gemacht schon großen Unterschied macht.",
    erklaerung:
      "Perfektionistisches Denken teilt Tage in 'gut' oder 'schlecht' ein. Ein Keks wird so zum vermeintlichen Beweis für einen 'schlechten Tag', obwohl der Rest des Tages völlig im Rahmen war. Diese Schwarz-Weiß-Logik erzeugt unnötigen Druck.",
    wissenschaft:
      "Forschung zu dichotomem ('Alles-oder-nichts'-)Denken bei Ernährungsverhalten zeigt einen Zusammenhang mit häufigeren Essanfällen und geringerer langfristiger Zielerreichung im Vergleich zu flexiblerer Herangehensweise.",
    schritte: [
      "Ersetze 'perfekt' durch 'gut genug' als Tagesziel.",
      "Bewerte deine Woche als Ganzes, nicht einzelne Mahlzeiten.",
      "Erlaube dir bewusst geplante Ausnahmen statt ungeplanter Kontrollverluste.",
      "Feiere kleine, unperfekte Fortschritte aktiv.",
    ],
    typischeFehler: [
      "Nach einer kleinen Abweichung den ganzen Tag oder die ganze Woche 'abschreiben'.",
      "Sich nur an Extremen (100 % perfekt oder komplett gescheitert) messen.",
      "Kleine Erfolge nicht wahrnehmen, weil sie 'nicht perfekt' waren.",
    ],
    aktion: "Bewerte deinen heutigen Tag als Ganzes, nicht anhand einer einzelnen Mahlzeit.",
    quellen: ["Palascha, A. et al. (2015): How does dichotomous thinking about food relate to weight regain?"],
  },

  // ---------- SCHLAF & STRESS ----------
  {
    id: "schlaf-gewicht",
    titel: "Schlaf und Gewicht: Der unterschätzte Zusammenhang",
    kategorie: "Schlaf & Stress",
    emoji: "🌙",
    mythos: null,
    lesezeit: "4 min",
    kurzantwort:
      "Chronischer Schlafmangel unter 7 Stunden steigert dein Hungerhormon Ghrelin, senkt das Sättigungshormon Leptin und erschwert Fettabbau spürbar.",
    warumWichtig:
      "Du kannst noch so diszipliniert essen und trainieren — bei dauerhaft schlechtem Schlaf arbeitest du gegen deine eigene Biochemie.",
    erklaerung:
      "Bei Schlafmangel gerät dein Hormonsystem aus dem Gleichgewicht: weniger Leptin (Sättigung), mehr Ghrelin (Hunger). Gleichzeitig steigt das Stresshormon Cortisol, was Wassereinlagerung und Muskelabbau begünstigt.",
    wissenschaft:
      "Eine vielzitierte Studie der University of Chicago zeigte: Bei gleichem Kaloriendefizit verloren Probanden mit 8,5 Stunden Schlaf deutlich mehr Fett, während sie bei 5,5 Stunden Schlaf überwiegend Muskelmasse verloren.",
    schritte: [
      "Trinke ab 14 Uhr keinen Kaffee mehr.",
      "Halte dein Schlafzimmer kühl (16–18 °C) und dunkel.",
      "Lade dein Handy außerhalb des Schlafzimmers auf.",
      "Geh möglichst zur gleichen Uhrzeit ins Bett, auch am Wochenende.",
    ],
    typischeFehler: [
      "Schlafmangel unter der Woche am Wochenende 'nachholen' wollen.",
      "Bis kurz vor dem Einschlafen auf ein helles Handydisplay schauen.",
      "Koffein am Nachmittag als harmlos einschätzen.",
    ],
    aktion: "Trink heute nach 14 Uhr keinen Kaffee mehr und beobachte, wie du einschläfst.",
    quellen: [
      "Nedeltcheva, A. V. et al. (2010): Insufficient sleep undermines dietary efforts to reduce adiposity.",
      "Taheri, S. et al. (2004): Short sleep duration is associated with reduced leptin and elevated ghrelin.",
    ],
  },
  {
    id: "cortisol-stress-gewicht",
    titel: "Cortisol: Wie Stress dein Gewicht beeinflusst",
    kategorie: "Schlaf & Stress",
    emoji: "😤",
    mythos: null,
    lesezeit: "3 min",
    kurzantwort:
      "Chronischer Stress erhöht dauerhaft dein Cortisollevel, was Appetit auf energiereiche Nahrung anregt und Bauchfett-Einlagerung begünstigt.",
    warumWichtig:
      "Wer in stressigen Lebensphasen ungewollt zunimmt, liegt oft nicht an fehlender Disziplin, sondern an einer nachvollziehbaren biologischen Reaktion.",
    erklaerung:
      "Cortisol bereitet deinen Körper evolutionär auf 'Kampf oder Flucht' vor und fordert dafür schnelle Energie — Zucker und Fett. Gleichzeitig begünstigt dauerhaft erhöhtes Cortisol die Einlagerung von viszeralem Bauchfett.",
    wissenschaft:
      "Klinische Studien zeigen einen Zusammenhang zwischen chronisch erhöhtem Cortisol und vermehrter Fettspeicherung im Bauchraum sowie einer Präferenz für kalorienreiche Komfortnahrung unter Stress.",
    schritte: [
      "Baue tägliche kurze Bewegungspausen zum Stressabbau ein.",
      "Nutze eine einfache Atemtechnik: 4 Sek. ein-, 4 Sek. anhalten, 4 Sek. ausatmen.",
      "Reduziere Koffein an besonders stressigen Tagen.",
      "Schaffe physische Distanz zwischen Stress-Trigger und Essen — z. B. kurz rausgehen.",
    ],
    typischeFehler: [
      "Süßigkeiten als einziges Stress-Ventil direkt am Arbeitsplatz griffbereit haben.",
      "Bei Stress noch mehr Koffein trinken und dadurch den Puls weiter erhöhen.",
      "Mahlzeiten vor Stress ausfallen lassen, was abends zu Stressessen führt.",
    ],
    aktion: "Mach jetzt einmal die 4-4-4-Atemübung, bevor du weiterarbeitest.",
    quellen: ["Epel, E. et al. (2001): Stress may add bite to appetite in women: cortisol and eating behavior."],
  },

  // ---------- MYTHEN WIDERLEGT ----------
  {
    id: "mythos-abends-essen",
    titel: "Nach 18 Uhr essen macht dick",
    kategorie: "Mythen widerlegt",
    emoji: "🕕",
    mythos: { behauptung: "Kohlenhydrate nach 18 Uhr werden direkt als Fett gespeichert", wahrheit: "Deinem Körper ist die Uhrzeit egal — zählt nur die Kalorienbilanz des Tages." },
    lesezeit: "2 min",
    kurzantwort:
      "Mythos: Kohlenhydrate nach 18 Uhr werden direkt als Fett gespeichert. Wahrheit: Deinem Körper ist die Uhrzeit egal — zählt nur die Kalorienbilanz des Tages.",
    warumWichtig:
      "Dieser Mythos führt dazu, dass Menschen abends hungrig ins Bett gehen und nachts erst recht Heißhunger bekommen.",
    erklaerung:
      "Der Mythos stammt daher, dass Essen Insulin ausschüttet, was die Fettverbrennung kurzzeitig pausiert. Das ist ein völlig normaler Vorgang, der nachts einfach weiterläuft, sobald die Verdauung abgeschlossen ist.",
    wissenschaft:
      "Kontrollierte Studien zum Essenszeitpunkt zeigen keinen relevanten Unterschied im Fettabbau, wenn die Gesamtkalorien über den Tag gleich bleiben — unabhängig davon, ob spät oder früh gegessen wird.",
    schritte: [
      "Iss dein Abendessen, wenn du wirklich hungrig bist, nicht nach starrer Uhrzeit.",
      "Achte auf die Gesamtbilanz des Tages statt auf Uhrzeiten.",
      "Baue bei Bedarf ein proteinreiches, sättigendes Abendessen ein.",
    ],
    typischeFehler: [
      "Abendessen komplett ausfallen lassen aus Angst vor der Uhrzeit.",
      "Nachts hungrig wach liegen, statt eine ausgewogene Abendmahlzeit zu essen.",
    ],
    aktion: "Iss heute Abend ganz normal, wenn du hungrig bist — unabhängig von der Uhrzeit.",
    quellen: ["Sofer, S. et al. (2011): Greater weight loss with carbohydrates eaten mostly at dinner."],
  },
  {
    id: "mythos-kohlenhydrate-fett",
    titel: "Kohlenhydrate machen fett",
    kategorie: "Mythen widerlegt",
    emoji: "🍞",
    mythos: { behauptung: "Kohlenhydrate sind der Hauptgrund für Übergewicht", wahrheit: "Ein Kalorienüberschuss macht dick — unabhängig von der Nährstoffquelle." },
    lesezeit: "2 min",
    kurzantwort:
      "Mythos: Kohlenhydrate sind der Hauptgrund für Übergewicht. Wahrheit: Ein Kalorienüberschuss macht dick — unabhängig von der Nährstoffquelle.",
    warumWichtig:
      "Dieser Mythos führt zu unnötigem, oft kaum durchhaltbarem Verzicht auf ganze Lebensmittelgruppen.",
    erklaerung:
      "Kohlenhydrate erhöhen den Insulinspiegel, das stimmt. Insulin blockiert aber nicht grundsätzlich die Fettverbrennung — es reguliert lediglich die Energieverteilung. Entscheidend bleibt, ob insgesamt mehr oder weniger Energie aufgenommen wird, als verbraucht wird.",
    wissenschaft:
      "Direkte Vergleichsstudien zwischen kohlenhydratreicher und kohlenhydratarmer Ernährung bei gleicher Kalorien- und Proteinzufuhr zeigen identischen Fettabbau.",
    schritte: [
      "Konzentriere dich auf die Gesamtkalorienbilanz, nicht auf einzelne Nährstoffe.",
      "Wähle komplexe Kohlenhydrate mit Ballaststoffen.",
      "Vermeide strikte Verbote ganzer Lebensmittelgruppen.",
    ],
    typischeFehler: [
      "Kohlenhydrate komplett meiden und dadurch Heißhunger provozieren.",
      "Fett unkontrolliert als 'Ersatz' für gestrichene Kohlenhydrate essen.",
    ],
    aktion: "Iss deine nächste Kohlenhydrat-Beilage ohne schlechtes Gewissen.",
    quellen: ["Hall, K. D. et al. (2016): Energy expenditure and body composition changes after an isocaloric ketogenic diet."],
  },
  {
    id: "mythos-spot-reduction",
    titel: "Bauchfett gezielt verbrennen (Spot Reduction)",
    kategorie: "Mythen widerlegt",
    emoji: "🎯",
    mythos: { behauptung: "Bauchmuskelübungen verbrennen gezielt Bauchfett", wahrheit: "Lokaler Fettabbau an einer bestimmten Stelle ist physiologisch nicht möglich." },
    lesezeit: "2 min",
    kurzantwort:
      "Mythos: Bauchmuskelübungen verbrennen gezielt Bauchfett. Wahrheit: Lokaler Fettabbau an einer bestimmten Stelle ist physiologisch nicht möglich.",
    warumWichtig:
      "Wer stundenlang Crunches macht, um gezielt am Bauch abzunehmen, investiert Zeit in etwas, das keine Wirkung im gewünschten Sinne hat.",
    erklaerung:
      "Dein Körper entscheidet genetisch bedingt selbst, an welcher Stelle er Fett zuerst abbaut, sobald ein Kaloriendefizit besteht. Bauchmuskelübungen stärken die Muskulatur darunter, lassen das Fett darüber aber nicht selektiv schmelzen.",
    wissenschaft:
      "Kontrollierte Studien zu einseitigem Rumpftraining zeigen keine gezielte Fettreduktion an der trainierten Körperstelle, sondern nur allgemeinen, gleichmäßig verteilten Fettabbau im Rahmen des Gesamtdefizits.",
    schritte: [
      "Fokussiere dich auf ein Ganzkörper-Kaloriendefizit statt auf isolierte Bauchübungen.",
      "Trainiere den Rumpf für Kraft und Stabilität, nicht als 'Fettburner'.",
      "Erwarte Fettabbau über den ganzen Körper, nicht punktuell.",
    ],
    typischeFehler: [
      "Stundenlang Bauchübungen machen in der Hoffnung auf gezielten Fettabbau.",
      "Enttäuscht sein, wenn sich nach Bauchtraining am Bauch 'nichts tut'.",
    ],
    aktion: "Ersetze deine nächste geplante 'Extra-Bauch-Session' durch eine normale Ganzkörpereinheit.",
    quellen: ["Ramirez-Campillo, R. et al. (2013): Regional fat loss from the abdomen is not induced by localized training."],
  },
  {
    id: "mythos-muskelkater",
    titel: "Muskelkater = gutes Training",
    kategorie: "Mythen widerlegt",
    emoji: "💪",
    mythos: { behauptung: "Ohne Muskelkater hat das Training nicht gewirkt", wahrheit: "Muskelkater ist kein verlässlicher Indikator für Trainingserfolg." },
    lesezeit: "2 min",
    kurzantwort:
      "Mythos: Ohne Muskelkater hat das Training nicht gewirkt. Wahrheit: Muskelkater ist kein verlässlicher Indikator für Trainingserfolg.",
    warumWichtig:
      "Wer Muskelkater als Maßstab nutzt, überlastet sich oft unnötig oder fühlt sich bei fehlendem Muskelkater fälschlich entmutigt.",
    erklaerung:
      "Muskelkater entsteht vor allem durch ungewohnte Bewegungen oder starke Dehnungsbelastung, nicht direkt durch Muskelwachstum. Mit der Zeit an eine Übung gewöhnt, lässt der Muskelkater nach — obwohl weiterhin Fortschritt stattfindet.",
    wissenschaft:
      "Untersuchungen zu Muskelkater (DOMS) zeigen keine verlässliche Korrelation zwischen dessen Ausprägung und tatsächlichem Muskelwachstum oder Kraftzuwachs.",
    schritte: [
      "Miss Fortschritt an Kraft- und Wiederholungszahlen, nicht am Muskelkater.",
      "Erwarte weniger Muskelkater, je vertrauter eine Übung wird.",
      "Trainiere weiter, auch wenn kein Muskelkater vom letzten Mal spürbar ist.",
    ],
    typischeFehler: [
      "Trainingsintensität künstlich erhöhen, nur um Muskelkater zu erzeugen.",
      "Sich ohne Muskelkater als 'nicht hart genug trainiert' fühlen.",
    ],
    aktion: "Notiere bei deinem nächsten Training Gewicht und Wiederholungen statt auf Muskelkater zu achten.",
    quellen: ["Schoenfeld, B. J. & Contreras, B. (2013): Is postexercise muscle soreness a valid indicator of muscular adaptations?"],
  },
  {
    id: "mythos-cardio-bestes",
    titel: "Cardio ist das Beste zum Abnehmen",
    kategorie: "Mythen widerlegt",
    emoji: "🏃",
    mythos: { behauptung: "Nur Cardio bringt beim Abnehmen etwas", wahrheit: "Krafttraining schützt zusätzlich deine Muskelmasse und ist dafür mindestens genauso wichtig." },
    lesezeit: "2 min",
    kurzantwort:
      "Mythos: Nur Cardio bringt beim Abnehmen etwas. Wahrheit: Krafttraining schützt zusätzlich deine Muskelmasse und ist dafür mindestens genauso wichtig.",
    warumWichtig:
      "Wer nur auf Cardio setzt, nimmt zwar ab, verliert dabei aber oft überproportional viel Muskelmasse statt Fett.",
    erklaerung:
      "Abnehmen entsteht primär durch ein Kaloriendefizit — egal ob durch Ernährung, Cardio oder Kraftsport erreicht. Krafttraining hat dabei den zusätzlichen Vorteil, die Muskulatur im Defizit zu erhalten, sodass am Ende mehr Fett und weniger Muskeln verloren gehen.",
    wissenschaft:
      "Vergleichsstudien zu reinem Cardio versus kombiniertem Kraft- und Cardiotraining im Kaloriendefizit zeigen bei Kombination einen deutlich besseren Erhalt der fettfreien Masse bei vergleichbarem Gesamtgewichtsverlust.",
    schritte: [
      "Kombiniere 2–3× Krafttraining pro Woche mit moderatem Cardio.",
      "Sieh Cardio als Ergänzung, nicht als einzige Trainingsform.",
      "Priorisiere Krafttraining, wenn die Zeit knapp ist.",
    ],
    typischeFehler: [
      "Ausschließlich Cardio machen und Krafttraining ganz weglassen.",
      "Nach Gewichtsverlust enttäuscht sein, wenn der Körper 'schlaff' statt straff wirkt.",
    ],
    aktion: "Ergänze dein nächstes Cardio-Training um eine kurze Krafteinheit.",
    quellen: ["Willis, L. H. et al. (2012): Effects of aerobic and/or resistance training on body mass and fat mass."],
  },
  {
    id: "mythos-frauen-maennlich",
    titel: "Frauen werden durch Krafttraining männlich",
    kategorie: "Mythen widerlegt",
    emoji: "🏋️‍♀️",
    mythos: { behauptung: "Schweres Krafttraining lässt Frauen 'unweiblich' und muskulös wirken", wahrheit: "Das ist physiologisch praktisch unmöglich." },
    lesezeit: "2 min",
    kurzantwort:
      "Mythos: Schweres Krafttraining lässt Frauen 'unweiblich' und muskulös wirken. Wahrheit: Das ist physiologisch praktisch unmöglich.",
    warumWichtig:
      "Dieser Mythos hält viele Frauen davon ab, von den enormen gesundheitlichen Vorteilen des Krafttrainings zu profitieren.",
    erklaerung:
      "Massiver Muskelaufbau hängt stark vom Testosteronspiegel ab. Frauen haben natürlicherweise nur einen Bruchteil des Testosteronspiegels von Männern — das begrenzt das Muskelwachstum deutlich, unabhängig vom Trainingsaufwand.",
    wissenschaft:
      "Studien zu geschlechtsspezifischen Trainingsanpassungen zeigen bei Frauen unter identischem Krafttrainingsreiz einen deutlich geringeren absoluten Muskelzuwachs als bei Männern, bedingt durch den hormonellen Unterschied.",
    schritte: [
      "Trainiere mit Gewichten, die dich wirklich fordern, ohne Angst vor 'zu viel Muskeln'.",
      "Erwarte eine straffere, definiertere Silhouette statt 'Bodybuilder-Muskeln'.",
      "Fokussiere dich auf Kraftzuwachs als Fortschrittsmaß.",
    ],
    typischeFehler: [
      "Nur mit sehr leichten Gewichten trainieren aus Angst vor Muskelaufbau.",
      "Krafttraining komplett meiden und dadurch auf gesundheitliche Vorteile verzichten.",
    ],
    aktion: "Erhöhe bei deiner nächsten Trainingseinheit einmal bewusst das Gewicht.",
    quellen: ["Hunter, G. R. et al. (2004): Sex differences in resistance training-induced muscle hypertrophy."],
  },
  {
    id: "mythos-intervallfasten",
    titel: "Intervallfasten ist die beste Diät",
    kategorie: "Mythen widerlegt",
    emoji: "⏰",
    mythos: { behauptung: "Intervallfasten hat einen magischen Stoffwechsel-Vorteil gegenüber anderen Diätformen", wahrheit: "Es ist ein Werkzeug wie jedes andere — nicht überlegen, nur anders." },
    lesezeit: "2 min",
    kurzantwort:
      "Mythos: Intervallfasten hat einen magischen Stoffwechsel-Vorteil gegenüber anderen Diätformen. Wahrheit: Es ist ein Werkzeug wie jedes andere — nicht überlegen, nur anders.",
    warumWichtig:
      "Intervallfasten wird oft als überlegene Methode vermarktet. Für manche Menschen passt es gut in den Alltag, für andere ist es unnötig einschränkend.",
    erklaerung:
      "Intervallfasten begrenzt das Zeitfenster fürs Essen, ändert aber nicht automatisch die Gesamtkalorienzufuhr. Der Effekt entsteht meist dadurch, dass Menschen im kürzeren Essensfenster unbewusst weniger essen — nicht durch einen besonderen Stoffwechseleffekt.",
    wissenschaft:
      "Eine vielbeachtete Studie im Fachjournal JAMA Internal Medicine zeigte, dass Intervallfasten bei gleicher Kalorienzufuhr keinen zusätzlichen Vorteil gegenüber klassischer, kontinuierlicher Kalorienreduktion bringt.",
    schritte: [
      "Wähle die Essensstruktur, die zu deinem Alltag passt — mit oder ohne Fastenfenster.",
      "Achte weiterhin auf ausreichend Protein innerhalb deines Essensfensters.",
      "Probiere Intervallfasten nur aus, wenn es dir subjektiv leichter fällt, nicht weil es 'überlegen' ist.",
    ],
    typischeFehler: [
      "Intervallfasten als Freifahrtschein sehen, im Essensfenster beliebig viel zu essen.",
      "Sich zum Fasten zwingen, obwohl regelmäßige Mahlzeiten besser passen würden.",
    ],
    aktion: "Wähle für morgen bewusst die Essensstruktur, die realistisch zu deinem Tag passt.",
    quellen: ["Trepanowski, J. F. et al. (2017): Effect of alternate-day fasting on weight loss (JAMA Internal Medicine)."],
  },
  {
    id: "mythos-detox",
    titel: "Detox und Entgiftungskuren",
    kategorie: "Mythen widerlegt",
    emoji: "🧪",
    mythos: { behauptung: "Detox-Kuren entgiften den Körper von Schadstoffen", wahrheit: "Leber und Nieren erledigen diese Aufgabe zuverlässig, ganz ohne Saftkur." },
    lesezeit: "2 min",
    kurzantwort:
      "Mythos: Detox-Kuren entgiften den Körper von Schadstoffen. Wahrheit: Leber und Nieren erledigen diese Aufgabe zuverlässig, ganz ohne Saftkur.",
    warumWichtig:
      "Detox-Produkte kosten oft viel Geld und suggerieren ein Problem, das gesunde Organe bereits vollständig selbst lösen.",
    erklaerung:
      "Deine Leber und Nieren filtern kontinuierlich Stoffwechselprodukte und Fremdstoffe aus dem Körper — das ist ihre normale, tägliche Funktion. Kein Saft, Tee oder Präparat kann diese Organe 'unterstützen', ohne dass sie ohnehin schon arbeiten.",
    wissenschaft:
      "Systematische Übersichtsarbeiten zu kommerziellen Detox-Diäten fanden keine belastbaren Beweise dafür, dass sie die Entgiftungsfunktion des Körpers messbar verbessern.",
    schritte: [
      "Unterstütze deine Organe stattdessen durch ausreichend Wasser und ballaststoffreiche Ernährung.",
      "Spare dir das Geld für teure Detox-Kuren.",
      "Setze auf nachhaltige, alltagstaugliche Ernährung statt kurzfristiger Kuren.",
    ],
    typischeFehler: [
      "Nach einer 'ungesunden' Phase eine radikale Detox-Kur als Ausgleich starten.",
      "Detox-Tees als Ersatz für ausgewogene Ernährung sehen.",
    ],
    aktion: "Trink heute stattdessen einfach ausreichend Wasser über den Tag verteilt.",
    quellen: ["Klein, A. V. & Kiat, H. (2015): Detox diets for toxin elimination and weight management: a critical review."],
  },

  // ---------- HUNGER & HEISSHUNGER ----------
  {
    id: "heisshunger-besiegen",
    titel: "Wie werde ich Heißhunger los?",
    kategorie: "Hunger & Heißhunger",
    emoji: "🍫",
    mythos: null,
    lesezeit: "4 min",
    kurzantwort:
      "Heißhunger ist kein Charakterfehler, sondern meist ein Nährstoff- oder Schlafmangel-Signal. Stabiler Blutzucker durch Protein und Ballaststoffe nimmt ihm die Grundlage.",
    warumWichtig:
      "Wer ständig gegen heftige Cravings ankämpfen muss, verliert irgendwann die Willenskraft — Biologie gewinnt langfristig immer gegen reine Disziplin.",
    erklaerung:
      "Isst du viel Zucker oder Weißmehl, schießt dein Blutzucker schnell hoch und fällt danach ebenso schnell wieder ab. In diesem Tief funkt dein Gehirn 'Schnell Zucker her' — das erlebst du als Heißhunger. Protein und Ballaststoffe verhindern dieses Auf und Ab.",
    wissenschaft:
      "Studien zeigen, dass ein hoher Proteinanteil das Hungerhormon Ghrelin über mehrere Stunden dämpft, während Schlafmangel dessen Ausschüttung nachweislich verstärkt.",
    schritte: [
      "Trink bei einer Heißhunger-Attacke zunächst ein großes Glas Wasser — oft ist es eigentlich Durst.",
      "Achte darauf, dass jede Mahlzeit eine klare Proteinquelle enthält.",
      "Erhöhe den Ballaststoffanteil durch Gemüse, Hülsenfrüchte und Vollkornprodukte.",
      "Priorisiere 7–8 Stunden Schlaf, um Ghrelin niedrig zu halten.",
    ],
    typischeFehler: [
      "Mahlzeiten auslassen, was abends zu noch heftigerem Heißhunger führt.",
      "Sich Süßigkeiten komplett verbieten, was den psychologischen Druck erhöht.",
      "Keine Süßigkeiten griffbereit haben, aber trotzdem ständig danach schauen.",
    ],
    aktion: "Trink jetzt ein großes Glas Wasser und warte 15 Minuten, bevor du entscheidest.",
    quellen: [
      "Weigle, D. S. et al. (2005): A high-protein diet induces sustained reductions in appetite.",
      "Spiegel, K. et al. (2004): Sleep curtailment is associated with decreased leptin levels and increased hunger.",
    ],
  },
];
