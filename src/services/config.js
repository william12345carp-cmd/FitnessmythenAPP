/* Zentrale Integrations-Konfiguration — vorbereitet, nicht aktiv.
   Alle Werte kommen später aus Env-Variablen (.env, siehe .env.example).
   §9.3: Preis/Price-ID niemals im Code hardcoden. */

export const integrationConfig = {
  // TODO: Supabase-Projekt anlegen und Werte setzen (§9 Stack, §9.4 Auth)
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? null,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? null,

  // TODO: Stripe konfigurieren — STRIPE_PRICE_ID als Env-Variable (§9.3).
  // Der Secret Key und der Webhook gehören ausschließlich in die Supabase
  // Edge Function, niemals ins Frontend.
  stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? null,

  // TODO: Analytics-Provider wählen (Entscheidung liegt beim Gründer)
  analyticsKey: import.meta.env.VITE_ANALYTICS_KEY ?? null,

  // TODO: Web-Push-Public-Key bei Push-Integration (§6)
  pushPublicKey: import.meta.env.VITE_PUSH_PUBLIC_KEY ?? null,
};

/** True, sobald echte Integrationen konfiguriert sind — bis dahin laufen Mocks. */
export const isMockMode = !integrationConfig.supabaseUrl;
