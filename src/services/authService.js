/* [4] Auth — Mock mit vorbereiteter Supabase-Schnittstelle. */

import { analyticsService } from "./analyticsService.js";

export const authService = {
  /**
   * TODO: Supabase Magic Link — supabase.auth.signInWithOtp({ email }) (§9.4).
   * Kein Passwort, kein Social Login in V1.
   */
  async sendMagicLink(email) {
    analyticsService.track("magic_link_requested");
    return { ok: true, email };
  },
  /** TODO: Supabase Session-Handling nach Link-Bestätigung (§9.4). */
  async confirmMagicLink(email) {
    analyticsService.track("magic_link_confirmed");
    return { ok: true, user: { id: "mock-user-1", email } };
  },
  /** TODO: supabase.auth.signOut() */
  async signOut() {
    analyticsService.track("sign_out");
    return { ok: true };
  },
};
