import { IsoDate } from "@giancosta86/time-utils";
import { IsoDateFormat } from "./IsoDateFormat.js";

describe("Formatting ISO date", () => {
  const isoDateString = "2020-07-09";

  describe("with default options", () => {
    it.each([
      ["en", "July 9, 2020"],
      ["es", "9 de julio de 2020"],
      ["zh", "2020年7月9日"]
    ])("should work in %p locale", (locale, expectedOutput) => {
      const isoDateFormat = new IsoDateFormat(locale);
      const isoDate = new IsoDate(isoDateString);
      const actualOutput = isoDateFormat.format(isoDate);

      expect(actualOutput).toBe(expectedOutput);
    });
  });

  describe("with custom options", () => {
    const isoDateString = "2020-04-08";

    it.each([
      ["en", "Apr 08, 20"],
      ["es", "08 abr 20"],
      ["zh", "20年4月08日"]
    ])("should work in %p locale", (locale, expectedOutput) => {
      const isoDateFormat = new IsoDateFormat(locale, {
        day: "2-digit",
        month: "short",
        year: "2-digit"
      });
      const isoDate = new IsoDate(isoDateString);
      const actualOutput = isoDateFormat.format(isoDate);

      expect(actualOutput).toBe(expectedOutput);
    });
  });
});
