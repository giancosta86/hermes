import { HashMap } from "@rimbu/hashed";
import { Dictionary } from "./Dictionary";

describe("Dictionary", () => {
  describe("when requesting a single-word translation", () => {
    describe("when the translation is available", () => {
      it("should return the translation", () => {
        const dictionary = new Dictionary(HashMap.of(["dodo", "ciop"]));
        const translation = dictionary.translate("dodo");

        expect(translation).toBe("ciop");
      });
    });

    describe("when the translation is NOT available", () => {
      it("should return the phrase itself", () => {
        const dictionary = new Dictionary();
        const translation = dictionary.translate("dodo");

        expect(translation).toBe("dodo");
      });
    });
  });

  describe("when requesting a multi-word translation", () => {
    describe("when the translation is available", () => {
      it("should return the translation", () => {
        const dictionary = new Dictionary(
          HashMap.of(["a b c", "alpha beta gamma"])
        );
        const translation = dictionary.translate("a b c");

        expect(translation).toBe("alpha beta gamma");
      });
    });

    describe("when the translation is NOT available", () => {
      it("should return the phrase itself", () => {
        const dictionary = new Dictionary();
        const translation = dictionary.translate("a b c");

        expect(translation).toBe("a b c");
      });
    });
  });

  describe("when requesting raw translations", () => {
    describe("when the dictionary is empty", () => {
      it("should return an empty object", () => {
        const dictionary = new Dictionary();
        const rawTranslations = dictionary.toRawTranslations();

        expect(rawTranslations).toBeEmptyObject();
      });
    });

    describe("when the dictionary contains translations", () => {
      it("should return all the translations", () => {
        const dictionary = new Dictionary(
          HashMap.of(["cip", "ciop"], ["yogi", "bubu"])
        );
        const rawTranslations = dictionary.toRawTranslations();

        expect(rawTranslations).toEqual({
          cip: "ciop",
          yogi: "bubu"
        });
      });
    });
  });

  describe("building from raw translations", () => {
    it("should work", () => {
      const sourceTranslations = {
        Alpha: "A",
        Beta: "B",
        Gamma: "C",
        Delta: "D"
      };

      const dictionary = Dictionary.fromRawTranslations(sourceTranslations);

      const actualTranslations = dictionary.toRawTranslations();

      expect(actualTranslations).toEqual(sourceTranslations);
    });
  });
});
