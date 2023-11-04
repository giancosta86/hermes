import { HashMap } from "@rimbu/hashed";
import { BasicDictionary } from "./BasicDictionary";

describe("Basic dictionary", () => {
  describe("when requesting a single-word translation", () => {
    describe("when the translation is available", () => {
      it("should return the translation", () => {
        const dictionary = new BasicDictionary(HashMap.of(["dodo", "ciop"]));
        const translation = dictionary.translate("dodo");

        expect(translation).toBe("ciop");
      });
    });

    describe("when the translation is NOT available", () => {
      it("should return the phrase itself", () => {
        const dictionary = new BasicDictionary();
        const translation = dictionary.translate("dodo");

        expect(translation).toBe("dodo");
      });
    });
  });

  describe("when requesting a multi-word translation", () => {
    describe("when the translation is available", () => {
      it("should return the translation", () => {
        const dictionary = new BasicDictionary(
          HashMap.of(["a b c", "alpha beta gamma"])
        );
        const translation = dictionary.translate("a b c");

        expect(translation).toBe("alpha beta gamma");
      });
    });

    describe("when the translation is NOT available", () => {
      it("should return the phrase itself", () => {
        const dictionary = new BasicDictionary();
        const translation = dictionary.translate("a b c");

        expect(translation).toBe("a b c");
      });
    });
  });

  describe("when requesting raw translations", () => {
    describe("when the dictionary is empty", () => {
      it("should return an empty object", () => {
        const dictionary = new BasicDictionary();
        const rawTranslations = dictionary.toRawTranslations();

        expect(rawTranslations).toBeEmptyObject();
      });
    });

    describe("when the dictionary contains translations", () => {
      it("should return all the translations", () => {
        const dictionary = new BasicDictionary(
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
});
