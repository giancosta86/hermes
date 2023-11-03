import { HashMap } from "@rimbu/hashed";
import { BasicBilingualDictionary } from "./BasicBilingualDictionary";

describe("Basic bilingual dictionary", () => {
  describe("when requesting a translation", () => {
    describe("when the translation is available", () => {
      it("should return the translation", () => {
        const dictionary = new BasicBilingualDictionary(
          HashMap.of(["dodo", "ciop"])
        );
        const translation = dictionary.get("dodo");

        expect(translation).toBe("ciop");
      });
    });

    describe("when the translation is NOT available", () => {
      it("should return the key itself", () => {
        const dictionary = new BasicBilingualDictionary();
        const translation = dictionary.get("dodo");

        expect(translation).toBe("dodo");
      });
    });
  });

  describe("when requesting raw translations", () => {
    describe("when the dictionary is empty", () => {
      it("should return an empty object", () => {
        const dictionary = new BasicBilingualDictionary();
        const rawTranslations = dictionary.toRawTranslations();

        expect(rawTranslations).toBeEmptyObject();
      });
    });

    describe("when the dictionary contains translations", () => {
      it("should return all the translations", () => {
        const dictionary = new BasicBilingualDictionary(
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
