/* [4] Abo — Mock mit vorbereiteter Stripe-Schnittstelle. */

import { analyticsService } from "./analyticsService.js";

export const subscriptionService = {
  /**
   * TODO: Stripe Checkout Session mit trial_period_days = 7 und
   * STRIPE_PRICE_ID aus Env-Variable — Preis nie hardcoden (§9.3).
   * Quelle der Wahrheit für subscription_status ist AUSSCHLIESSLICH der
   * Stripe-Webhook (Supabase Edge Function); das Frontend setzt den Status nie.
   * Mock: Trial-Start bei Registrierung.
   */
  startTrial(now) {
    const trialEnds = new Date(now.getTime() + 7 * 86400000);
    analyticsService.track("trial_started");
    return { subscription_status: "trial", trial_ends_at: trialEnds.toISOString() };
  },
  /** TODO: Link zum Stripe Customer Portal (Abo verwalten/kündigen, §9.3). */
  openCustomerPortal() {
    analyticsService.track("customer_portal_opened");
    // Im Prototyp: nur Hinweis, kein echtes Portal.
    return { ok: false, reason: "mock" };
  },
  /** Mock für "Abo fortsetzen" — real via Stripe Checkout + Webhook. */
  resumeSubscription() {
    analyticsService.track("subscription_resumed");
    return { subscription_status: "active" };
  },
};
