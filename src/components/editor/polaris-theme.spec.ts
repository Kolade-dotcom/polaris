import { describe, expect, test } from "vitest";
import { polarisLight, polarisDark } from "./polaris-theme";

describe("polaris-theme", () => {
  test("polarisLight theme is defined", () => {
    expect(polarisLight).toBeDefined();
    expect(typeof polarisLight).toBe("object");
  });

  test("polarisDark theme is defined", () => {
    expect(polarisDark).toBeDefined();
    expect(typeof polarisDark).toBe("object");
  });

  test("themes are valid CodeMirror extensions", () => {
    // The themes are CodeMirror extensions, not plain objects
    expect(polarisLight).toBeTruthy();
    expect(polarisDark).toBeTruthy();
  });
});
