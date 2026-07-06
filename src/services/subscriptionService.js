/* [4] Abo — Stripe via Supabase Edge Functions (§9.3), Mock-Fallback ohne Env.
   Quelle der Wahrheit für subscription_status ist AUSSCHLIESSLICH der
   Stripe-Webhook (supabase/functions/stripe-webhook); das Frontend liest den
   Status nur aus Supabase und setzt ihn NIE selbst. */

import { isMockMode } from "./config.js";
import { supabase } from "./supabaseClient.js";
import { analyticsService } from "./analyticsService.js";

async function invokeAndRedirect(functionName) {
  const { data, error } = await supabase.functions.invoke(functionName);
  if (error || !data?.url) {
    console.error(`[subscription] ${functionName} failed`, error ?? data);
    return { ok: false, reason: "error" };
  }
  window.location.assign(data.url);
  return { ok: true };
}

export const subscriptionService = {
  /**
   * NUR Mock-Modus. Real setzt die DB die Trial-Felder beim Anlegen des
   * Profils (Option B, Entscheidung Gründer 2026-07-06): subscription_status
   * 'trial' und trial_ends_at = now() + 7 Tage als Spalten-Defaults.
   */
  startTrial(now) {
    const trialEnds = new Date(now.getTime() + 7 * 86400000);
    analyticsService.track("trial_started");
    return { subscription_status: "trial", trial_ends_at: trialEnds.toISOString() };
  },

  /**
   * Stripe Checkout starten (Trial abgelaufen oder Abo beendet → neues Abo).
   * Option B: bewusst OHNE trial_period_days — der kostenlose Zeitraum lief
   * bereits über trial_ends_at. Preis-ID liegt serverseitig in STRIPE_PRICE_ID.
   * Bei Erfolg verlässt der Redirect die App; der Webhook setzt den Status.
   */
  async startCheckout() {
    analyticsService.track("checkout_started");
    if (isMockMode) return { ok: false, reason: "mock" };
    return invokeAndRedirect("create-checkout-session");
  },

  /** Stripe Customer Portal: Abo verwalten, Zahlung reparieren, kündigen (§9.3). */
  async openCustomerPortal() {
    analyticsService.track("customer_portal_opened");
    if (isMockMode) return { ok: false, reason: "mock" };
    return invokeAndRedirect("create-portal-session");
  },

  /** NUR Mock-Modus ("Abo fortsetzen" ohne echtes Stripe). Real: startCheckout/Portal. */
  resumeSubscription() {
    analyticsService.track("subscription_resumed");
    return { subscription_status: "active" };
  },
};
