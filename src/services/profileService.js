/* [4] Profile — Persistenz für `profiles` (§9.1, RLS §9.2).
   Neu gegenüber dem Prototyp: der hielt Profile nur im Reducer.
   Die Abo-Spalten (subscription_status, trial_ends_at, stripe_*) schreibt
   NIE dieser Service — sie kommen aus DB-Defaults bzw. vom Stripe-Webhook
   (§9.3, per Spalten-Grants in der Migration erzwungen). */

import { isMockMode } from "./config.js";
import { supabase } from "./supabaseClient.js";
import { subscriptionService } from "./subscriptionService.js";

export const profileService = {
  /** Profil des Nutzers oder null → Onboarding (§9.4). */
  async fetchProfile(userId) {
    if (isMockMode) return null;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  /**
   * Legt das Profil nach dem Onboarding an und liefert die vollständige Zeile.
   * Option B (Entscheidung Gründer, 2026-07-06): Trial-Felder setzt die DB
   * (subscription_status='trial', trial_ends_at=now()+7d) — nicht der Client.
   */
  async createProfile({ userId, weightKg, targetWeightKg, goal, locationEquipment }, now) {
    if (isMockMode) {
      return {
        id: userId,
        created_at: now.toISOString(),
        weight_kg: weightKg,
        target_weight_kg: targetWeightKg,
        goal,
        location_equipment: locationEquipment,
        reminder_setting: "keine",
        ...subscriptionService.startTrial(now),
        stripe_customer_id: null,
        stripe_subscription_id: null,
      };
    }
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        weight_kg: weightKg,
        target_weight_kg: targetWeightKg,
        goal,
        location_equipment: locationEquipment,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /** Basisdaten aktualisieren (nur die vom Grant erlaubten Spalten). */
  async updateProfile(userId, patch) {
    if (isMockMode) return patch;
    const { data, error } = await supabase
      .from("profiles")
      .update(patch)
      .eq("id", userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
