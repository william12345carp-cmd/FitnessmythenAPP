# Fitnessmythen — V1 (Vite + React + Supabase + Stripe)

Eine Tageskarte, eine Kern-Handlung, ein Klick — mehr nicht. Evidenzbasiert,
ohne Gamification, ohne Streaks, ohne KI-Chats.

**Betriebsmodi:**

- **Mock-Modus** (keine `VITE_SUPABASE_*`-Werte gesetzt): Die App läuft komplett
  im Speicher — kein E-Mail-Versand, keine Zahlungen. Ideal für lokale
  UI-Entwicklung; Login und Abo werden über Demo-Buttons simuliert.
- **Real-Modus** (Supabase-Env gesetzt): Magic-Link-Login, Persistenz in
  Postgres (RLS), Stripe-Abo über Supabase Edge Functions.

## Lokal starten

```bash
npm install
cp .env.example .env.local   # Werte eintragen oder leer lassen (Mock-Modus)
npm run dev
```

## Scripts

| Script                 | Zweck                              |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Dev-Server (http://localhost:5173) |
| `npm run build`        | Production-Build nach `dist/`      |
| `npm run preview`      | Production-Build lokal serven      |
| `npm run test`         | Vitest im Watch-Modus              |
| `npm run test:run`     | Testlauf einmalig (CI)             |
| `npm run lint`         | ESLint                             |
| `npm run format`       | Prettier (schreibend)              |
| `npm run format:check` | Prettier (nur prüfen, CI)          |

## Testen mit dem DEV-Panel

Oben rechts sitzt ein `DEV`-Button — im Dev-Server immer, in Builds nur mit
`VITE_ENABLE_DEV_PANEL=true` (für Vercel-Preview/Staging, nie Production).
Damit lassen sich testen:

- **+1 Tag** → Tageswechsel (§5.3): neue Tagesfrage am nächsten Kalendertag
- **+3 Tage** → Wiedereinstieg (§5.2): Reentry-Karte nach 3+ Tagen Inaktivität
- **+7 Tage** → Trial-Ende (§9.3): Karte gesperrt, ruhiger Zahlungsscreen
- **Zahlung fehlgeschlagen** → Status `paused`, Paywall-Variante
- **App zurücksetzen** → kompletter Neustart des Flows

Hinweis: Die Zeitsimulation wirkt nur lokal im Browser, nicht auf Supabase-Daten.

## Architektur

| Ebene               | Pfad                                      | Inhalt                                                                                         |
| ------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Design-Tokens & CSS | `src/styles/tokens.css`                   | Farben, Typografie, alle Komponenten-Styles (§8)                                               |
| Schriften           | `src/main.jsx` (Fontsource-Importe)       | Newsreader + Instrument Sans self-hosted — DSGVO-konform, kein Google-CDN                      |
| Content (Mock)      | `src/data/mockCards.js`                   | Die 7 Beispielkarten aus §7 + Fallback-Platzhalter                                             |
| Options-Konstanten  | `src/data/options.js`                     | Ziele, Orte, Zeit/Energie, Erinnerung, Statuslabels (§9.1-Werte)                               |
| Regel-Engine        | `src/lib/ruleEngine.js`                   | Kartenauswahl (§5.2), Protein (§5.1), Abo-Sperre (§9.3) — pure functions, vollständig getestet |
| Datums-Helfer       | `src/lib/date.js`                         | Lokale Mitternacht (§5.3), Folio-Datum                                                         |
| Zahlen-Helfer       | `src/lib/number.js`                       | Dezimal-Parsing (Komma/Punkt), Validierung                                                     |
| Services            | `src/services/`                           | Auth (Magic Link), Profile, Logs, Abo (Stripe), Erinnerung, Analytics — mit Mock-Fallback      |
| Session-Bootstrap   | `src/hooks/useAuthBootstrap.js`           | Session-Check beim Start (§9.4), Rückkehr aus dem Stripe Checkout                              |
| App-State           | `src/store/appStore.jsx`                  | Context + Reducer, spiegelt `profiles`/`daily_logs` (§9.1)                                     |
| UI-Primitives       | `src/components/ui/`                      | Button, Choice, ChoiceGroup (Radiogroup), Field, Wordmark, CheckIcon                           |
| Geteilte Bausteine  | `src/components/`                         | BasicsFields (§4-Felder, Onboarding UND Profil), AppShell, DevPanel, ErrorBoundary             |
| Integrations-Config | `src/services/config.js` + `.env.example` | Env-Werte für Supabase/Stripe/Analytics/Push, `isMockMode`-Schalter                            |
| Screens             | `src/screens/`                            | Landing, Login, Onboarding (2 Schritte), Tagesfrage, Tageskarte, Heute-Tab, Paywall, Profil    |
| Datenbank           | `supabase/migrations/`                    | Schema `profiles`/`daily_logs`, RLS, Spalten-Grants (§9.1/§9.2)                                |
| Edge Functions      | `supabase/functions/`                     | `stripe-webhook`, `create-checkout-session`, `create-portal-session` (§9.3)                    |
| Tests               | `src/lib/*.test.js`                       | Vitest — komplette Matrix der Regel-Engine, Datums-/Zahlen-Helfer                              |

### Unverhandelbare Invarianten

- **Der Stripe-Webhook ist die einzige Quelle der Wahrheit für
  `subscription_status`** (§9.3). Das Frontend liest den Status nur aus Supabase
  und kann die Abo-Spalten nicht einmal schreiben — per Spalten-Grants in der
  Migration erzwungen, nicht nur per Konvention.
- **Die Kartenauswahl bleibt deterministisch und pure** (`src/lib/ruleEngine.js`),
  vollständig durch Unit-Tests abgedeckt.
- **Trial-Mechanik = Option B** (Entscheidung Gründer, 2026-07-06): Cardless
  Trial. `trial_ends_at` setzt die DB beim Anlegen des Profils (now() + 7 Tage);
  Stripe Checkout erscheint erst an der Paywall — dann ohne `trial_period_days`.
- **Tageswechsel = lokale Mitternacht** (§5.3), ein Log pro Tag
  (`UNIQUE(user_id, log_date)`), Reentry ab 3 Tagen Inaktivität — rein intern,
  keine externen Reactivation-Trigger.

## Supabase einrichten

1. Projekt anlegen ([supabase.com](https://supabase.com)) und CLI verbinden:
   ```bash
   npx supabase login
   npx supabase link --project-ref <project-ref>
   ```
2. Schema + RLS einspielen:
   ```bash
   npx supabase db push
   ```
3. Auth konfigurieren (Dashboard → Authentication → URL Configuration):
   - **Site URL**: Produktions-URL; zusätzlich `http://localhost:5173` und die
     Vercel-Preview-URLs als Redirect-URLs eintragen (Wildcards möglich).
   - E-Mail: Standard-Provider reicht zum Start; eigener SMTP-Absender vor
     Launch empfohlen. Magic Link ist der einzige Login-Weg (kein Passwort).
4. Edge Functions deployen und Secrets setzen:
   ```bash
   npx supabase functions deploy stripe-webhook create-checkout-session create-portal-session
   npx supabase secrets set STRIPE_SECRET_KEY=sk_... STRIPE_WEBHOOK_SECRET=whsec_... \
     STRIPE_PRICE_ID=price_... APP_URL=https://<produktions-domain>
   ```
5. Frontend-Env setzen (`.env.local` bzw. Vercel): `VITE_SUPABASE_URL`,
   `VITE_SUPABASE_ANON_KEY` (Project Settings → API).

## Stripe einrichten

1. Produkt „Fitnessmythen“ mit wiederkehrendem Preis **150 €/Monat** anlegen →
   `price_...`-ID als Secret `STRIPE_PRICE_ID` setzen (nie im Code, §9.3).
2. Webhook-Endpoint anlegen (Developers → Webhooks):
   - URL: `https://<project-ref>.supabase.co/functions/v1/stripe-webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`,
     `customer.subscription.deleted`, `invoice.payment_failed`
   - Signing Secret als `STRIPE_WEBHOOK_SECRET` setzen.
3. Customer Portal aktivieren (Settings → Billing → Customer portal), damit
   „Abo verwalten oder kündigen“ funktioniert.

Statusfluss: Checkout abgeschlossen → `active` · Zahlung fehlgeschlagen /
`past_due` → `paused` · Abo beendet → `cancelled`. Gesetzt wird der Status
ausschließlich vom Webhook (`supabase/functions/stripe-webhook`).

## Vercel Deployment

1. Repo bei Vercel importieren — Framework „Vite“ wird erkannt; `vercel.json`
   liegt bei (SPA-Rewrite, Cache- und Security-Header).
2. Environment Variables setzen:

   | Variable                 | Scope                | Wert                                        |
   | ------------------------ | -------------------- | ------------------------------------------- |
   | `VITE_SUPABASE_URL`      | Production + Preview | Supabase-Projekt-URL                        |
   | `VITE_SUPABASE_ANON_KEY` | Production + Preview | Supabase Anon Key                           |
   | `VITE_ENABLE_DEV_PANEL`  | **nur Preview**      | `true` (Zeitsimulation auf Staging testbar) |

3. **Preview = Staging**: Jeder Branch-Push bekommt eine Preview-URL. Damit der
   Magic Link dorthin zurückführt, die Preview-Domains in Supabase unter
   Auth → Redirect URLs eintragen. `APP_URL` (Edge-Function-Secret) zeigt auf
   Production — Checkout-Redirects landen also dort; Stripe-Tests laufen am
   saubersten mit Test-Keys auf der Production-Domain, bevor Live-Keys kommen.

## Qualität

- `npm run test:run` — 45 Tests, komplette Regel-Engine-Matrix (Kartenauswahl,
  Tie-Break, Reentry, Content-Gap-Fallback, Trial-Grenzwerte, DST-Datumsfälle).
- `npm run lint` und `npm run format:check` laufen sauber durch.
- Auswahlgruppen sind echte Radiogroups (aria-checked); der Erledigt-Haken ist
  ein Toggle-Button (aria-pressed); Error Boundary mit ruhigem Hinweis;
  `100dvh`-Fallback; `prefers-reduced-motion` wird respektiert.
- Fehlerpfade sprechen die Sprache des Produkts: ruhige Hinweise statt Alerts.

## Offene Gründer-Entscheidungen (TODO-Index)

Im Code als `TODO: …, Entscheidung liegt beim Gründer` markiert:

1. Finaler Fitnessmythen-Rot-Hexwert → `src/styles/tokens.css` (`--fm-red`, §11)
2. `location_tag` der Beispielkarte 1 („Zuhause“ → aktuell `egal`) → `src/data/mockCards.js`
3. Zeit/Energie-Tags der Reentry-Karte + weitere Reentry-Karten → `src/data/mockCards.js`
4. Finaler Text der generischen Fallback-Karte → `src/data/mockCards.js`
5. Sichtbarkeit der Content-Lücken (Admin-Bereich) → `src/services/contentGapService.js`
6. Analytics-Provider → `src/services/analyticsService.js`
7. Vollständige Content-Bibliothek (30–40 Karten) — danach Karten aus Supabase
   statt `mockCards.js` laden (Tabelle `content_cards` gemäß §9.1)
8. Impressum/AGB/Datenschutz/Widerruf — Links in Landing/Profil sind Platzhalter (§11)
9. Serverseitige `{protein_target}`-Auflösung (§9.1) — V1 löst bewusst
   clientseitig auf, damit die Regel-Engine pure und testbar bleibt
