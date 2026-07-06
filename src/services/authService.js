/* [4] Auth — Supabase Magic Link (§9.4), Mock-Fallback ohne Env-Werte.
   Kein Passwort, kein Social Login in V1. */

import { isMockMode } from "./config.js";
import { supabase } from "./supabaseClient.js";
import { analyticsService } from "./analyticsService.js";

export const authService = {
  /** Magic Link anfordern. Der Link führt zurück auf die App-Origin. */
  async sendMagicLink(email) {
    analyticsService.track("magic_link_requested");
    if (isMockMode) return { ok: true, email };
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) {
      console.error("[auth] signInWithOtp failed", error);
      return { ok: false, email, error: error.message };
    }
    return { ok: true, email };
  },

  /**
   * NUR Mock-Modus (Demo-Buttons im LoginScreen). Real gibt es keinen
   * Bestätigungs-Aufruf: der E-Mail-Link führt per Redirect zurück in die App,
   * Supabase liest das Token aus der URL und useAuthBootstrap übernimmt (§9.4).
   */
  async confirmMagicLink(email) {
    analyticsService.track("magic_link_confirmed");
    return { ok: true, user: { id: "mock-user-1", email } };
  },

  async signOut() {
    analyticsService.track("sign_out");
    if (!isMockMode) await supabase.auth.signOut();
    return { ok: true };
  },

  /** Aktuelle Session oder null — für den Session-Check beim App-Start (§9.4). */
  async getSession() {
    if (isMockMode) return null;
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  /** Auth-Events abonnieren; Rückgabe ist die Unsubscribe-Funktion. */
  onAuthStateChange(callback) {
    if (isMockMode) return () => {};
    const { data } = supabase.auth.onAuthStateChange(callback);
    return () => data.subscription.unsubscribe();
  },

  /**
   * Liest einen Auth-Fehler (z. B. abgelaufener Magic Link) aus der
   * Redirect-URL, entfernt ihn aus der Adresszeile und liefert den Code —
   * etwa "otp_expired". §9.4: klarer, freundlicher Hinweis statt Fehlerseite.
   */
  consumeAuthErrorFromUrl() {
    const hash = window.location.hash;
    if (!hash.includes("error")) return null;
    const code = new URLSearchParams(hash.slice(1)).get("error_code");
    if (!code) return null;
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    return code;
  },
};
