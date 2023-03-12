import {
  ensureLocale,
  ensureLanguageTag,
  getLocaleDistance
} from "./LocaleLike";

describe("Ensuring a Locale", () => {
  describe("when a Locale is passed", () => {
    it("should return the very same instance", () => {
      const expectedLocale = new Intl.Locale("en-GB");

      const actualLocale = ensureLocale(expectedLocale);

      expect(actualLocale).toBe(expectedLocale);
    });
  });

  describe("when a language tag is passed", () => {
    it("should build an equivalent locale", () => {
      const expectedLanguageTag = "zh-CN";

      const actualLocale = ensureLocale(expectedLanguageTag);

      expect(actualLocale.toString()).toBe(expectedLanguageTag);
    });
  });
});

describe("Ensuring the language tag", () => {
  describe("from a Locale", () => {
    it("should return the language tag", () => {
      const locale = new Intl.Locale("zh", {
        script: "Hans"
      });

      expect(ensureLanguageTag(locale)).toBe("zh-Hans");
    });
  });

  describe("from a language tag", () => {
    it("should return the language tag itself", () => {
      const languageTag = "en-US";

      expect(ensureLanguageTag(languageTag)).toBe(languageTag);
    });
  });
});

describe("Locale distance", () => {
  describe("when the language attribute is different", () => {
    describe("when there are no nuances", () => {
      it("should return +inf", () => {
        const distance = getLocaleDistance("en", "zh");
        expect(distance).toBe(Number.POSITIVE_INFINITY);
      });
    });

    describe("when there are equal nuances", () => {
      it("should still be +inf", () => {
        const sharedNuances: Readonly<Intl.LocaleOptions> = {
          region: "US",
          script: "Latn"
        };

        const distance = getLocaleDistance(
          new Intl.Locale("en", sharedNuances),
          new Intl.Locale("zh", sharedNuances)
        );

        expect(distance).toBe(Number.POSITIVE_INFINITY);
      });
    });

    describe("when there are different nuances", () => {
      it("should still be +inf", () => {
        const distance = getLocaleDistance(
          new Intl.Locale("en", { region: "US" }),
          new Intl.Locale("zh", { region: "CN" })
        );

        expect(distance).toBe(Number.POSITIVE_INFINITY);
      });
    });
  });

  describe("when the language attribute is the same", () => {
    describe("when there are no declared nuances", () => {
      it("should be 0", () => {
        const distance = getLocaleDistance(
          new Intl.Locale("en"),
          new Intl.Locale("en")
        );

        expect(distance).toBe(0);
      });
    });

    describe("when there are declared nuances", () => {
      describe("when the region is the only nuance", () => {
        describe("when the region is different", () => {
          it("should be 1", () => {
            const distance = getLocaleDistance(
              new Intl.Locale("en", { region: "US" }),
              new Intl.Locale("en", { region: "GB" })
            );

            expect(distance).toBe(1);
          });
        });

        describe("when the region is equal", () => {
          it("should be 0", () => {
            const distance = getLocaleDistance(
              new Intl.Locale("en", { region: "GB" }),
              new Intl.Locale("en", { region: "GB" })
            );

            expect(distance).toBe(0);
          });
        });
      });

      describe("when there are more nuances", () => {
        it("should be increased by 1 for each non-matching nuance", () => {
          const sharedNuances: Readonly<Intl.LocaleOptions> = {
            region: "GB",
            calendar: "gregory",
            hourCycle: "h24"
          };

          const distance = getLocaleDistance(
            new Intl.Locale("en", {
              ...sharedNuances,
              script: "Latn",
              caseFirst: "upper"
            }),

            new Intl.Locale("en", {
              ...sharedNuances,
              script: "Hans",
              caseFirst: "lower"
            })
          );

          expect(distance).toBe(2);
        });
      });
    });
  });

  describe("when one term is a Locale and the other is a language tag", () => {
    it("should still be computed as expected", () => {
      const distance = getLocaleDistance(
        "zh-Hans-CN-u-ca-gregory-hc-h24",

        new Intl.Locale("zh", {
          region: "TW",
          calendar: "gregory",
          hourCycle: "h24",
          script: "Hant"
        })
      );

      expect(distance).toBe(2);
    });
  });
});
