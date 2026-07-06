# Fitnessmythen — V1 Prototyp (Vite + React)

Klickbarer Prototyp gemäß Master-Build-Prompt V1. **Alle Integrationen sind Mocks** —
keine echte Authentifizierung, keine Supabase-Verbindung, keine Stripe-Zahlungen,
keine Push-Benachrichtigungen, keine E-Mails.

## Lokal starten

```bash
npm install
npm run dev
```

Dann die angezeigte URL im Browser öffnen (Standard: http://localhost:5173).

## Testen mit dem DEV-Panel

Oben rechts sitzt ein klar markierter `DEV`-Button (nur Prototyp, vor Produktion
entfernen). Damit lassen sich testen:

- **+1 Tag** → Tageswechsel (§5.3): neue Tagesfrage am nächsten Kalendertag
- **+3 Tage** → Wiedereinstieg (§5.2): Reentry-Karte nach 3+ Tagen Inaktivität
- **+7 Tage** → Trial-Ende (§9.3): Karte gesperrt, ruhiger Zahlungsscreen
- **Zahlung fehlgeschlagen** → Status `paused`, Paywall-Variante
- **App zurücksetzen** → kompletter Neustart des Flows

Hinweis: Der Zustand lebt bewusst nur im Speicher (kein localStorage). Ein
Browser-Reload setzt den Prototyp zurück.

## Architektur

| Ebene                      | Pfad                                      | Inhalt                                                                                                                          |
| -------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Design-Tokens & Global CSS | `src/styles/tokens.css`                   | Farben, Typografie, alle Komponenten-Styles (§8)                                                                                |
| Mock-Content               | `src/data/mockCards.js`                   | Die 7 Beispielkarten aus §7 + Fallback-Platzhalter                                                                              |
| Options-Konstanten         | `src/data/options.js`                     | Ziele, Orte, Zeit/Energie, Erinnerung, Statuslabels (§9.1-Werte)                                                                |
| Regel-Engine               | `src/lib/ruleEngine.js`                   | Kartenauswahl (§5.2), Protein (§5.1), Abo-Sperre (§9.3) — pure functions                                                        |
| Datums-Helfer              | `src/lib/date.js`                         | Lokale Mitternacht (§5.3), Folio-Datum                                                                                          |
| Services (Mock)            | `src/services/`                           | Auth (Magic Link), Abo (Stripe), Erinnerung (Push), Analytics, Content-Gap-Log — Signaturen für spätere Integration vorbereitet |
| App-State                  | `src/store/appStore.jsx`                  | Context + Reducer, spiegelt `profiles`/`daily_logs` (§9.1)                                                                      |
| UI-Primitives              | `src/components/ui/`                      | Button, Choice, ChoiceGroup (Radiogroup), Field, Wordmark, CheckIcon                                                            |
| Geteilte Bausteine         | `src/components/`                         | BasicsFields (§4-Felder, von Onboarding UND Profil genutzt), AppShell, DevPanel, ErrorBoundary                                  |
| Zahlen-Helfer              | `src/lib/number.js`                       | Dezimal-Parsing (Komma/Punkt), Validierung                                                                                      |
| Integrations-Config        | `src/services/config.js` + `.env.example` | Env-Platzhalter für Supabase/Stripe/Analytics/Push — vorbereitet, nicht aktiv                                                   |
| Screens                    | `src/screens/`                            | Landing, Login, Onboarding (2 Schritte), Tagesfrage, Tageskarte, Heute-Tab, Paywall, Profil                                     |

## Qualitätshinweise

- Formular-State der Profil-Bearbeitung wird beim Öffnen aus dem Profil befüllt
  (abgebrochene Änderungen bleiben nie hängen).
- Auswahlgruppen sind echte Radiogroups (role=radiogroup/radio, aria-checked);
  der Erledigt-Haken ist ein Toggle-Button (aria-pressed).
- Ein Error Boundary fängt Renderfehler mit ruhigem Hinweis ab.
- `100dvh`-Fallback für mobile Browser; `prefers-reduced-motion` wird respektiert.
- State- und Dispatch-Context sind getrennt (stabiler `dispatch`).

## Spätere Integrationen (vorbereitet, nicht aktiv)

- **Supabase**: `src/services/authService.js` (Magic Link, §9.4), Persistenz von
  `profiles`/`daily_logs` mit RLS (§9.2), Edge Function für serverseitige
  `{protein_target}`-Auflösung (§9.1)
- **Stripe**: `src/services/subscriptionService.js` — Webhook als einzige Quelle
  der Wahrheit für `subscription_status` (§9.3), `STRIPE_PRICE_ID` als Env-Variable
- **Push**: `src/services/reminderService.js` (§6)
- **Analytics**: `src/services/analyticsService.js`

## Offene Gründer-Entscheidungen (TODO-Index)

Alle Stellen sind im Code als `// TODO: …, Entscheidung liegt beim Gründer` markiert:

1. Finaler Fitnessmythen-Rot-Hexwert → `src/styles/tokens.css` (`--fm-red`, §11)
2. `location_tag` der Beispielkarte 1 („Zuhause“ → aktuell `egal`) → `src/data/mockCards.js`
3. Zeit/Energie-Tags der Reentry-Karte + weitere Reentry-Karten → `src/data/mockCards.js`
4. Finaler Text der generischen Fallback-Karte → `src/data/mockCards.js`
5. Position des Stripe-Checkouts im Flow (vor/nach Onboarding) → `src/screens/OnboardingBasicsScreen.jsx`
6. Sichtbarkeit der Content-Lücken im Admin-Bereich → `src/services/contentGapService.js`
7. Vollständige Content-Bibliothek (30–40 Karten), Impressum/AGB/Datenschutz/Widerruf,
   Stripe-/Supabase-Setup, DPMA-Recherche → §11 des Master-Prompts
