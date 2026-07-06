/* [4] Erinnerungen — persistiert die Einstellung; Push-Versand kommt später.
   TODO: Push-Registrierung (Web Push / native) erst bei Integration.
   §6: genau eine neutrale Nachricht pro Tag, immer derselbe ruhige Ton:
   "Deine heutige Karte ist bereit." — kein Drohcharakter, keine Dramatik. */

import { isMockMode } from "./config.js";
import { supabase } from "./supabaseClient.js";
import { analyticsService } from "./analyticsService.js";

export const reminderService = {
  async updateReminder(setting) {
    analyticsService.track("reminder_updated", { setting });
    if (isMockMode) return { ok: true, setting };
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { ok: false, setting };
    const { error } = await supabase
      .from("profiles")
      .update({ reminder_setting: setting })
      .eq("id", user.id);
    if (error) {
      console.error("[reminder] update failed", error);
      return { ok: false, setting };
    }
    return { ok: true, setting };
  },
};
