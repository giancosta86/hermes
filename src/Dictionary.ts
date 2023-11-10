import { RMap } from "@rimbu/collection-types";
import { HashMap } from "@rimbu/hashed";

export type Phrase = string;

export type TranslationsByPhrase = Readonly<{ [phrase: string]: string }>;

export class Dictionary {
  static fromRawTranslations(translations: TranslationsByPhrase): Dictionary {
    const translationsMap = HashMap.from(Object.entries(translations));

    return new Dictionary(translationsMap);
  }

  constructor(private readonly translations?: RMap<Phrase, Phrase>) {}

  translate(phrase: Phrase): Phrase {
    return this.translations?.get(phrase) ?? phrase;
  }

  toRawTranslations(): TranslationsByPhrase {
    return Object.fromEntries(this.translations?.stream() ?? []);
  }
}
