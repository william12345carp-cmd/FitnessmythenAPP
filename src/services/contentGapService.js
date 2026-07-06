/* [4] Content-Lücken — internes Log.
   TODO: Content-Lücken sollen im Admin-Bereich sichtbar sein (§5.2).
   Ein Admin-Bereich ist nicht Teil von V1-UI → hier internes Log + Konsole.
   Entscheidung über Admin-Sichtbarkeit liegt beim Gründer. */

export const contentGapLog = [];

export function logContentGap(dailyInput, profile, reentry) {
  const entry = {
    time: dailyInput.time,
    energy: dailyInput.energy,
    location: profile.location_equipment,
    reentry,
    at: new Date().toISOString(),
  };
  contentGapLog.push(entry);
  console.warn("[content-gap]", entry);
}
