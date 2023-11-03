import { RMap } from "@rimbu/collection-types";
import {
  BilingualDictionary,
  Phrase,
  RawTranslations
} from "./BilingualDictionary";

export class BasicBilingualDictionary implements BilingualDictionary {
  constructor(private readonly translations?: RMap<Phrase, Phrase>) {}

  get(phrase: Phrase): Phrase {
    return this.translations?.get(phrase) ?? phrase;
  }

  toRawTranslations(): RawTranslations {
    const result: RawTranslations = {};

    this.translations?.forEach(([key, value]) => (result[key] = value));

    return result;
  }
}
