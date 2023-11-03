export type Phrase = string;

export type RawTranslations = { [key: string]: string };

export interface BilingualDictionary {
  get(phrase: Phrase): Phrase;

  toRawTranslations(): RawTranslations;
}
