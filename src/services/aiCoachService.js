/* KI-Coach — Stufe 2 (Gemini), aufgerufen über die Edge Function ai-coach.
   Der API-Key bleibt serverseitig (Supabase-Secret) und landet nie im
   Frontend-Bundle. Im Mock-Modus (kein Supabase konfiguriert) gibt es keine
   echte Antwort — das ist erwartet, kein Fehler. */

import { isMockMode } from "./config.js";
import { supabase } from "./supabaseClient.js";

export const aiCoachService = {
  /** { ok: true, antwort } | { ok: false, reason: "mock" | "error" } */
  async frageStellen(frage, profil) {
    if (isMockMode) return { ok: false, reason: "mock" };
    const { data, error } = await supabase.functions.invoke("ai-coach", {
      body: { frage, profil },
    });
    if (error || !data?.antwort) {
      console.error("[ai-coach] request failed", error ?? data);
      return { ok: false, reason: "error" };
    }
    return { ok: true, antwort: data.antwort };
  },
};
