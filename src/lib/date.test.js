import { describe, it, expect } from "vitest";
import { localDateKey, daysBetween, formatFolioDate } from "./date.js";

// Tests laufen mit TZ=Europe/Berlin (vite.config.js), Sicht deutscher Nutzer.

describe("localDateKey (§5.3 — Tageswechsel = lokale Mitternacht)", () => {
  it("liefert das lokale Kalenderdatum als YYYY-MM-DD", () => {
    expect(localDateKey(new Date(2026, 6, 6, 12, 0))).toBe("2026-07-06");
  });

  it("padded Monat und Tag zweistellig", () => {
    expect(localDateKey(new Date(2026, 0, 5))).toBe("2026-01-05");
  });

  it("kippt exakt um lokale Mitternacht, nicht um UTC-Mitternacht", () => {
    // 23:30 lokal am 6.7. ist 21:30 UTC — zählt trotzdem zum 6.7.
    expect(localDateKey(new Date(2026, 6, 6, 23, 30))).toBe("2026-07-06");
    expect(localDateKey(new Date(2026, 6, 7, 0, 0, 1))).toBe("2026-07-07");
  });
});

describe("daysBetween", () => {
  it("zählt Kalendertage zwischen zwei Date-Keys", () => {
    expect(daysBetween("2026-07-03", "2026-07-06")).toBe(3);
    expect(daysBetween("2026-07-06", "2026-07-06")).toBe(0);
  });

  it("bleibt bei Sommerzeit-Umstellung korrekt (23h-/25h-Tage)", () => {
    // DST-Beginn 2026: 29. März (23h-Tag), DST-Ende: 25. Oktober (25h-Tag).
    expect(daysBetween("2026-03-28", "2026-03-30")).toBe(2);
    expect(daysBetween("2026-10-24", "2026-10-26")).toBe(2);
  });

  it("rechnet über Monats- und Jahresgrenzen", () => {
    expect(daysBetween("2026-06-28", "2026-07-06")).toBe(8);
    expect(daysBetween("2025-12-30", "2026-01-02")).toBe(3);
  });
});

describe("formatFolioDate", () => {
  it("formatiert deutsch mit Wochentag", () => {
    expect(formatFolioDate("2026-07-06")).toBe("Montag, 6. Juli");
  });
});
