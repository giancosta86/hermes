import { RMap } from "@rimbu/collection-types";
import { Dictionary, Phrase, TranslationsByPhrase } from "./Dictionary";

export class BasicDictionary implements Dictionary {
  constructor(private readonly translations?: RMap<Phrase, Phrase>) {}

  translate(phrase: Phrase): Phrase {
    return this.translations?.get(phrase) ?? phrase;
  }

  toRawTranslations(): TranslationsByPhrase {
    return Object.fromEntries(this.translations?.stream() ?? []);
  }
}
