import { BilingualDictionary } from "./BilingualDictionary";
import { BilingualLibrary } from "./BilingualLibrary";

describe("Bilingual library", () => {
  describe("creation by phrase", () => {
    it("should support an empty iterable", () => {
      BilingualLibrary.byPhrase([]);
    });
  });

  describe("creation by locale", () => {
    it("should support an empty iterable", () => {
      BilingualLibrary.byLocale([]);
    });
  });

  describe.each([
    {
      creationMode: "by phrase",
      library: BilingualLibrary.byPhrase([
        [
          "book",
          [
            ["es", "libro"],
            ["zh-CN", "书"]
          ]
        ],

        ["theatre", [["es", "teatro"]]]
      ])
    },
    {
      creationMode: "by locale",
      library: BilingualLibrary.byLocale([
        [
          "es",
          [
            ["book", "libro"],
            ["theatre", "teatro"]
          ]
        ],

        ["zh-CN", [["book", "书"]]]
      ])
    }
  ])("created $creationMode", ({ library }) => {
    describe.each([
      {
        scenario: "a registered locale",
        locale: "zh-CN"
      },

      {
        scenario: "a matching, shorter locale",
        locale: "zh"
      },

      {
        scenario: "a matching, slightly longer locale",
        locale: "zh-Hans-CN"
      },

      {
        scenario: "a matching, much longer locale",
        locale: "zh-Hans-CN-u-ca-gregory-hc-h24"
      }
    ])("when requesting a dictionary for $scenario", ({ locale }) => {
      let dictionary: BilingualDictionary;

      beforeEach(() => {
        dictionary = library.getForLocale(locale);
      });

      describe("when requesting a localized phrase", () => {
        it("should return the localization", () => {
          const translation = dictionary.get("book");
          expect(translation).toBe("书");
        });
      });

      describe("when requesting a phrase with no translation in the dictionary", () => {
        it("should return the phrase itself", () => {
          const translation = dictionary.get("theatre");
          expect(translation).toBe("theatre");
        });
      });

      describe("when requesting a phrase not registered in any dictionary", () => {
        it("should return the phrase itself", () => {
          const translation = dictionary.get("<UNREGISTERED>");
          expect(translation).toBe("<UNREGISTERED>");
        });
      });
    });

    describe("when requesting a dictionary for a non-matching locale", () => {
      let dictionary: BilingualDictionary;

      beforeEach(() => {
        dictionary = library.getForLocale("de");
      });

      describe("when requesting a phrase translated to other locales", () => {
        it("should return the phrase itself", () => {
          const translation = dictionary.get("book");
          expect(translation).toBe("book");
        });
      });

      describe("when requesting a phrase not registered in any dictionary", () => {
        it("should return the phrase itself", () => {
          const translation = dictionary.get("<UNREGISTERED>");
          expect(translation).toBe("<UNREGISTERED>");
        });
      });
    });
  });
});
