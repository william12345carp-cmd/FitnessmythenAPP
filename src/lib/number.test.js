import { describe, it, expect } from "vitest";
import { parseDecimalInput, isPositiveNumber } from "./number.js";

describe("parseDecimalInput (deutsche Eingaben)", () => {
  it("akzeptiert Komma und Punkt als Dezimaltrennzeichen", () => {
    expect(parseDecimalInput("82,5")).toBe(82.5);
    expect(parseDecimalInput("82.5")).toBe(82.5);
    expect(parseDecimalInput("82")).toBe(82);
  });

  it("liefert NaN für leere/unbrauchbare Eingaben", () => {
    expect(parseDecimalInput("")).toBeNaN();
    expect(parseDecimalInput("abc")).toBeNaN();
  });
});

describe("isPositiveNumber", () => {
  it("akzeptiert nur endliche Zahlen größer 0", () => {
    expect(isPositiveNumber(82.5)).toBe(true);
    expect(isPositiveNumber(0)).toBe(false);
    expect(isPositiveNumber(-1)).toBe(false);
    expect(isPositiveNumber(NaN)).toBe(false);
    expect(isPositiveNumber(Infinity)).toBe(false);
  });
});
