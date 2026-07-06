/* ============================================================================
   [3] REGEL-ENGINE — deterministisch, pure functions
   Keine KI, keine Zufälligkeit außer bei mehreren gleich passenden Karten.
============================================================================ */

import { daysBetween } from "./date.js";

/** §5.1 — Protein-Mindestziel. NIEMALS unter 1,6 g/kg. */
export const PROTEIN_FACTOR_MIN = 1.6;
export function proteinTarget(targetWeightKg) {
  return Math.round(targetWeightKg * PROTEIN_FACTOR_MIN);
}

/**
 * §9.1 — Platzhalter-Auflösung {protein_target}.
 * TODO: In Produktion ausschließlich serverseitig (Supabase Edge Function),
 * bevor der Text an den Client geht. Hier Mock im "Service-Layer" des Prototyps.
 */
export function resolveCardText(text, profile) {
  if (!text) return text;
  return text.replaceAll("{protein_target}", String(proteinTarget(profile.target_weight_kg)));
}

/**
 * §5.2 — tage_seit_letzter_aktivitaet: aus der Log-Historie berechnet,
 * kein gespeicherter Status. Historie leer (neuer Nutzer) → 0 (kein Reentry).
 */
export function daysSinceLastActivity(logs, todayKey) {
  const past = logs
    .map((l) => l.log_date)
    .filter((d) => d < todayKey)
    .sort();
  if (past.length === 0) return 0;
  return daysBetween(past[past.length - 1], todayKey);
}

export const REENTRY_THRESHOLD_DAYS = 3;

/**
 * §5.2 — Kartenauswahl, exakt nach Pseudocode.
 * Rückgabe: { card, isContentGap } — Content-Lücken werden intern protokolliert.
 */
export function selectCard(cards, profile, dailyInput, reentry) {
  const match = cards.filter(
    (c) =>
      c.time_tag === dailyInput.time &&
      c.energy_tag === dailyInput.energy &&
      (c.location_tag === profile.location_equipment || c.location_tag === "egal") &&
      c.is_reentry_card === reentry
  );
  if (match.length > 0) {
    // Bei mehreren Treffern: spezifischer Ort schlägt "egal" (deterministisch).
    const specific = match.find((c) => c.location_tag === profile.location_equipment);
    return { card: specific || match[0], isContentGap: false };
  }
  // Fallback: generischste Alternative (mittel/normal/egal/false), §5.2
  const fallback = cards.find(
    (c) =>
      c.time_tag === "mittel" &&
      c.energy_tag === "normal" &&
      c.location_tag === "egal" &&
      c.is_reentry_card === false
  );
  return { card: fallback, isContentGap: true };
}

/** §9.3 — Karten-Sperre: nur bei aktivem Trial oder aktivem Abo freigeschaltet. */
export function isSubscriptionLocked(profile, now) {
  if (!profile) return false;
  const { subscription_status, trial_ends_at } = profile;
  if (subscription_status === "active") return false;
  if (subscription_status === "trial") return now.getTime() > new Date(trial_ends_at).getTime();
  return true; // 'paused' und 'cancelled' sperren die Karte
}
