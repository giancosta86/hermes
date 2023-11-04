export type Phrase = string;

export type TranslationsByPhrase = Readonly<{ [phrase: string]: string }>;

export interface Dictionary {
  translate(phrase: Phrase): Phrase;

  toRawTranslations(): TranslationsByPhrase;
}
