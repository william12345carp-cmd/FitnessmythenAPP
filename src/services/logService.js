/* [4] Tages-Logs — Persistenz für `daily_logs` (§9.1, RLS §9.2).
   Neu gegenüber dem Prototyp: der hielt Logs nur im Reducer.
   Schreibzugriffe sind optimistisch: der Store ist sofort aktuell, die
   Persistenz läuft nebenher — ein Netzfehler darf die Tageskarte nicht
   blockieren (Folge wäre schlimmstenfalls eine verpasste Reentry-Erkennung). */

import { isMockMode } from "./config.js";
import { supabase } from "./supabaseClient.js";

export const logService = {
  /** Gesamte Historie des Nutzers — Grundlage für Reentry (§5.2). */
  async fetchLogs(userId) {
    if (isMockMode) return [];
    const { data, error } = await supabase
      .from("daily_logs")
      .select("id, user_id, log_date, time_today, energy_today, card_id, completed")
      .eq("user_id", userId)
      .order("log_date", { ascending: true });
    if (error) throw error;
    return data;
  },

  /** Log des Tages anlegen (UNIQUE user_id+log_date sichert §5.3 ab). */
  async addLog({ userId, logDate, timeToday, energyToday, cardId }) {
    if (isMockMode) return;
    const { error } = await supabase.from("daily_logs").insert({
      user_id: userId,
      log_date: logDate,
      time_today: timeToday,
      energy_today: energyToday,
      card_id: cardId,
      completed: false,
    });
    if (error) throw error;
  },

  /** Erledigt-Haken persistieren. */
  async setCompleted(userId, logDate, completed) {
    if (isMockMode) return;
    const { error } = await supabase
      .from("daily_logs")
      .update({ completed })
      .eq("user_id", userId)
      .eq("log_date", logDate);
    if (error) throw error;
  },
};
