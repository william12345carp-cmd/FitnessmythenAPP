/* Zentrale Integrations-Konfiguration.
   Alle Werte kommen aus Env-Variablen (siehe .env.example).
   §9.3: Preis/Price-ID niemals im Code hardcoden — die Stripe-Price-ID lebt
   ausschließlich serverseitig (Supabase Edge Function, STRIPE_PRICE_ID). */

export const integrationConfig = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? null,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? null,

  // Derzeit ungenutzt: Hosted Checkout läuft per Redirect, ohne Stripe.js im
  // Frontend. Secret Key und Webhook-Secret gehören ausschließlich in die
  // Supabase Edge Functions, niemals hierher.
  stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? null,

  // TODO: Analytics-Provider wählen (Entscheidung liegt beim Gründer)
  analyticsKey: import.meta.env.VITE_ANALYTICS_KEY ?? null,

  // TODO: Web-Push-Public-Key bei Push-Integration (§6)
  pushPublicKey: import.meta.env.VITE_PUSH_PUBLIC_KEY ?? null,
};

/** True, solange Supabase nicht konfiguriert ist — dann laufen alle Services als Mock. */
export const isMockMode = !(integrationConfig.supabaseUrl && integrationConfig.supabaseAnonKey);
