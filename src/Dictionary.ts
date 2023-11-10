import { RMap } from "@rimbu/collection-types";

export type Phrase = string;

export type TranslationsByPhrase = Readonly<{ [phrase: string]: string }>;

export class Dictionary {
  constructor(private readonly translations?: RMap<Phrase, Phrase>) {}

  translate(phrase: Phrase): Phrase {
    return this.translations?.get(phrase) ?? phrase;
  }

  toRawTranslations(): TranslationsByPhrase {
    return Object.fromEntries(this.translations?.stream() ?? []);
  }
}
