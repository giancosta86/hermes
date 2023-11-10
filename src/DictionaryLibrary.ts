import { HashMap } from "@rimbu/hashed";
import { Stream } from "@rimbu/stream";
import { ProximityMap } from "@rimbu/proximity";
import { RMap } from "@rimbu/collection-types";
import { Dictionary, Phrase, TranslationsByPhrase } from "./Dictionary";
import { LocaleLike } from "./LocaleLike";

export type TranslationsByLanguageTag = Readonly<{
  [languageTag: string]: string;
}>;

export class DictionaryLibrary {
  static empty(): DictionaryLibrary {
    return new DictionaryLibrary(ProximityMap.empty());
  }

  static byLanguageTag(
    translationsByLanguageTagThenPhrase: Readonly<{
      [languageTag: string]: TranslationsByPhrase;
    }>
  ): DictionaryLibrary {
    const equivalentMap = LocaleLike.createProximityContext().from(
      Stream.from(Object.entries(translationsByLanguageTagThenPhrase)).map(
        ([languageTag, translationsByPhrase]) => [
          languageTag,
          HashMap.from(Object.entries(translationsByPhrase))
        ]
      )
    );

    return new DictionaryLibrary(equivalentMap);
  }

  static byPhrase(
    translationsByPhraseThenLanguageTag: Readonly<{
      [phrase: string]: TranslationsByLanguageTag;
    }>
  ): DictionaryLibrary {
    const translationsByLanguageTagMapBuilder =
      LocaleLike.createProximityContext().builder<
        Intl.BCP47LanguageTag,
        HashMap.Builder<Phrase, Phrase>
      >();

    Stream.from(Object.entries(translationsByPhraseThenLanguageTag)).forEach(
      ([phrase, translationsByLanguageTag]) =>
        Stream.from(Object.entries(translationsByLanguageTag)).forEach(
          ([languageTag, translation]) => {
            let translationsForCurrentLanguageTagMapBuilder =
              translationsByLanguageTagMapBuilder.get(languageTag);

            if (!translationsForCurrentLanguageTagMapBuilder) {
              translationsForCurrentLanguageTagMapBuilder = HashMap.builder();
              translationsByLanguageTagMapBuilder.set(
                languageTag,
                translationsForCurrentLanguageTagMapBuilder
              );
            }

            translationsForCurrentLanguageTagMapBuilder.set(
              phrase,
              translation
            );
          }
        )
    );

    const translationsByLanguageTag = translationsByLanguageTagMapBuilder
      .build()
      .mapValues(internalBuilder => internalBuilder.build());

    return new DictionaryLibrary(translationsByLanguageTag);
  }

  private constructor(
    private readonly translationsByLanguageTag: ProximityMap<
      Intl.BCP47LanguageTag,
      RMap<Phrase, Phrase>
    >
  ) {}

  getDictionary(locale: LocaleLike): Dictionary {
    const languageTag = LocaleLike.toLanguageTag(locale);
    const translations = this.translationsByLanguageTag.get(languageTag);

    return new Dictionary(translations);
  }

  streamLanguageTags(): Stream<Intl.BCP47LanguageTag> {
    return this.translationsByLanguageTag.streamKeys();
  }
}
