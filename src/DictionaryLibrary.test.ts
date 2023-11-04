import { Dictionary } from "./Dictionary";
import { DictionaryLibrary } from "./DictionaryLibrary";

describe("Dictionary library", () => {
  describe("empty creation", () => {
    it("should actually work", () => {
      const library = DictionaryLibrary.empty();

      expect(library.streamLanguageTags().count()).toBe(0);
    });
  });

  describe("creation by languageTag", () => {
    it("should support an empty iterable", () => {
      const library = DictionaryLibrary.byLanguageTag({});

      expect(library.streamLanguageTags().count()).toBe(0);
    });
  });

  describe("creation by phrase", () => {
    it("should support an empty iterable", () => {
      const library = DictionaryLibrary.byPhrase({});

      expect(library.streamLanguageTags().count()).toBe(0);
    });
  });

  describe.each([
    {
      requestType: "a perfectly-matching language tag",
      requestedLanguageTag: "fr-FR"
    },

    {
      requestType: "a shorter, matching language tag",
      requestedLanguageTag: "fr"
    },

    {
      requestType: "a longer, matching language tag",
      requestedLanguageTag: "fr-FR-u-hc-h24"
    }
  ])(
    "when just requesting a translation for $requestType",
    ({ requestedLanguageTag }) => {
      it("should work", () => {
        const library = DictionaryLibrary.byLanguageTag({
          "fr-FR": { book: "livre" }
        });
        const dictionary = library.getDictionary(requestedLanguageTag);
        const translation = dictionary.translate("book");

        expect(translation).toBe("livre");
      });
    }
  );

  describe.each([
    {
      creationMode: "by language tag",
      library: DictionaryLibrary.byLanguageTag({
        es: {
          book: "libro",
          theatre: "teatro"
        },

        "zh-CN": {
          book: "书"
        }
      })
    },

    {
      creationMode: "by phrase",
      library: DictionaryLibrary.byPhrase({
        book: {
          es: "libro",
          "zh-CN": "书"
        },

        theatre: {
          es: "teatro"
        }
      })
    }
  ])("created $creationMode", ({ library }) => {
    it("should list all the registered language tags", () => {
      expect(library.streamLanguageTags().toArray().sort()).toEqual([
        "es",
        "zh-CN"
      ]);
    });

    describe.each([
      {
        scenario: "a registered language tag",
        languageTag: "zh-CN"
      },

      {
        scenario: "a matching, shorter language tag",
        languageTag: "zh"
      },

      {
        scenario: "a matching, slightly longer language tag",
        languageTag: "zh-Hans-CN"
      },

      {
        scenario: "a matching, much longer language tag",
        languageTag: "zh-Hans-CN-u-ca-gregory-hc-h24"
      }
    ])("when requesting a dictionary for $scenario", ({ languageTag }) => {
      let dictionary: Dictionary;

      beforeEach(() => {
        dictionary = library.getDictionary(languageTag);
      });

      describe("when requesting a translated phrase", () => {
        it("should return the translation", () => {
          const translation = dictionary.translate("book");
          expect(translation).toBe("书");
        });
      });

      describe("when requesting a phrase with no translation", () => {
        it("should return the phrase itself", () => {
          const translation = dictionary.translate("theatre");
          expect(translation).toBe("theatre");
        });
      });

      describe("when requesting a phrase not registered in any dictionary", () => {
        it("should return the phrase itself", () => {
          const translation = dictionary.translate("<UNREGISTERED>");
          expect(translation).toBe("<UNREGISTERED>");
        });
      });
    });

    describe("when requesting a dictionary for a non-matching language tag", () => {
      let dictionary: Dictionary;

      beforeEach(() => {
        dictionary = library.getDictionary("de");
      });

      describe("when requesting a phrase translated to other language tags", () => {
        it("should return the phrase itself", () => {
          const translation = dictionary.translate("book");
          expect(translation).toBe("book");
        });
      });

      describe("when requesting a phrase not registered in any dictionary", () => {
        it("should return the phrase itself", () => {
          const translation = dictionary.translate("<UNREGISTERED>");
          expect(translation).toBe("<UNREGISTERED>");
        });
      });
    });
  });
});
