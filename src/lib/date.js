/* [3] Datums-Helfer — pure functions, unverändert übernommen. */

/** Lokales Kalenderdatum als 'YYYY-MM-DD' (§5.3: Tageswechsel = lokale Mitternacht). */
export function localDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function daysBetween(dateKeyA, dateKeyB) {
  const a = new Date(dateKeyA + "T00:00:00");
  const b = new Date(dateKeyB + "T00:00:00");
  return Math.round((b - a) / 86400000);
}

export function formatFolioDate(dateKey) {
  const d = new Date(dateKey + "T00:00:00");
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(d);
}
