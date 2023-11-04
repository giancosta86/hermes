import { LocaleLike } from "./LocaleLike";

describe("Converting a LocaleLike to a Locale", () => {
  describe("when a Locale is passed", () => {
    it("should return the very same instance", () => {
      const expectedLocale = new Intl.Locale("en-GB");

      const actualLocale = LocaleLike.toLocale(expectedLocale);

      expect(actualLocale).toBe(expectedLocale);
    });
  });

  describe("when a language tag is passed", () => {
    it("should build an equivalent locale", () => {
      const expectedLanguageTag = "zh-CN";

      const actualLocale = LocaleLike.toLocale(expectedLanguageTag);

      expect(actualLocale.toString()).toBe(expectedLanguageTag);
    });
  });
});

describe("Converting a LocaleLike to a language tag", () => {
  describe("when a Locale is passed", () => {
    it("should return its language tag", () => {
      const locale = new Intl.Locale("zh", {
        script: "Hans"
      });

      const actualTag = LocaleLike.toLanguageTag(locale);

      expect(actualTag).toBe("zh-Hans");
    });
  });

  describe("when a language tag is passed", () => {
    it("should return the language tag itself", () => {
      const languageTag = "en-US";

      const actualTag = LocaleLike.toLanguageTag(languageTag);

      expect(actualTag).toBe(languageTag);
    });
  });
});

describe("Locale distance", () => {
  describe("when the language attribute is different", () => {
    describe("when there are no facets", () => {
      it("should return +inf", () => {
        const distance = LocaleLike.getDistance("en", "zh");

        expect(distance).toBe(Number.POSITIVE_INFINITY);
      });
    });

    describe("when there are equal facets", () => {
      it("should still be +inf", () => {
        const sharedfacets: Readonly<Intl.LocaleOptions> = {
          region: "US",
          script: "Latn"
        };

        const distance = LocaleLike.getDistance(
          new Intl.Locale("en", sharedfacets),
          new Intl.Locale("zh", sharedfacets)
        );

        expect(distance).toBe(Number.POSITIVE_INFINITY);
      });
    });

    describe("when there are different facets", () => {
      it("should be +inf", () => {
        const distance = LocaleLike.getDistance(
          new Intl.Locale("en", { region: "US" }),
          new Intl.Locale("zh", { region: "CN" })
        );

        expect(distance).toBe(Number.POSITIVE_INFINITY);
      });
    });
  });

  describe("when the language attribute is the same", () => {
    describe("when there are no declared facets", () => {
      it("should be 0", () => {
        const distance = LocaleLike.getDistance(
          new Intl.Locale("en"),
          new Intl.Locale("en")
        );

        expect(distance).toBe(0);
      });
    });

    describe("when there are declared facets", () => {
      describe("when the region is the only facet", () => {
        describe("when the region is different", () => {
          it("should be 1", () => {
            const distance = LocaleLike.getDistance(
              new Intl.Locale("en", { region: "US" }),
              new Intl.Locale("en", { region: "GB" })
            );

            expect(distance).toBe(1);
          });
        });

        describe("when the region is equal", () => {
          it("should be 0", () => {
            const distance = LocaleLike.getDistance(
              new Intl.Locale("en", { region: "GB" }),
              new Intl.Locale("en", { region: "GB" })
            );

            expect(distance).toBe(0);
          });
        });
      });

      describe("when there are more facets", () => {
        it("should be increased by 1 for each non-matching facet", () => {
          const sharedfacets: Readonly<Intl.LocaleOptions> = {
            region: "GB",
            calendar: "gregory",
            hourCycle: "h24"
          };

          const distance = LocaleLike.getDistance(
            new Intl.Locale("en", {
              ...sharedfacets,
              script: "Latn",
              caseFirst: "upper"
            }),

            new Intl.Locale("en", {
              ...sharedfacets,
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
      const distance = LocaleLike.getDistance(
        "zh-Hans-CN-u-ca-gregory-hc-h24",

        new Intl.Locale("zh", {
          script: "Hant",
          region: "TW",
          calendar: "gregory",
          hourCycle: "h24"
        })
      );

      expect(distance).toBe(2);
    });
  });
});

describe("Creating a ProximityMap", () => {
  it("should work with a perfectly-matching locale", () => {
    const map = LocaleLike.createProximityContext().of<string, number>([
      "fr-FR",
      90
    ]);
    const actual = map.get("fr-FR");

    expect(actual).toBe(90);
  });

  it("should return the correct value for a shorter locale", () => {
    const map = LocaleLike.createProximityContext().of<string, number>([
      "fr-FR",
      90
    ]);
    const actual = map.get("fr");

    expect(actual).toBe(90);
  });

  it("should return the correct value for a longer locale", () => {
    const map = LocaleLike.createProximityContext().of<string, number>([
      "fr-FR",
      90
    ]);
    const actual = map.get("fr-FR-u-hc-h24");

    expect(actual).toBe(90);
  });
});
