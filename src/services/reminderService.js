/* [4] Erinnerungen — Mock mit vorbereiteter Push-Schnittstelle. */

import { analyticsService } from "./analyticsService.js";

export const reminderService = {
  /**
   * TODO: Push-Registrierung (Web Push / native) erst bei Integration.
   * §6: genau eine neutrale Nachricht pro Tag, immer derselbe ruhige Ton:
   * "Deine heutige Karte ist bereit." — kein Drohcharakter, keine Dramatik.
   */
  async updateReminder(setting) {
    analyticsService.track("reminder_updated", { setting });
    return { ok: true, setting };
  },
};
