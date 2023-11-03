import { HashMap } from "@rimbu/hashed";
import { Stream } from "@rimbu/stream";
import { ProximityMap } from "@rimbu/proximity";
import { RMap } from "@rimbu/collection-types";
import { BilingualDictionary, Phrase } from "./BilingualDictionary";
import { LocaleLike, ensureLanguageTag, getLocaleDistance } from "./LocaleLike";
import { BasicBilingualDictionary } from "./BasicBilingualDictionary";

const proximityContext = ProximityMap.createContext({
  distanceFunction: getLocaleDistance
});

export class BilingualLibrary {
  static byPhrase(
    localizationsByPhrase: Iterable<
      readonly [Phrase, Iterable<readonly [LocaleLike, Phrase]>]
    >
  ): BilingualLibrary {
    const translationsByLocaleMapBuilder = proximityContext.builder<
      Intl.BCP47LanguageTag,
      HashMap.Builder<Phrase, Phrase>
    >();

    Stream.from(localizationsByPhrase).forEach(([phrase, localizations]) => {
      Stream.from(localizations).forEach(([localeLike, translation]) => {
        const languageTag = ensureLanguageTag(localeLike);

        let translationMapBuilder =
          translationsByLocaleMapBuilder.get(languageTag);
        if (!translationMapBuilder) {
          translationMapBuilder = HashMap.builder();
          translationsByLocaleMapBuilder.set(
            languageTag,
            translationMapBuilder
          );
        }

        translationMapBuilder.set(phrase, translation);
      });
    });

    const translationsByLocaleMap = translationsByLocaleMapBuilder
      .build()
      .mapValues(internalBuilder => internalBuilder.build());

    return new BilingualLibrary(translationsByLocaleMap);
  }

  static byLocale(
    translationsByLocale: Iterable<
      readonly [LocaleLike, Iterable<readonly [Phrase, Phrase]>]
    >
  ): BilingualLibrary {
    const translationsByLocaleMap = proximityContext.from(
      Stream.from(translationsByLocale).map(([locale, translationPairs]) => [
        ensureLanguageTag(locale),
        HashMap.from(translationPairs)
      ])
    );

    return new BilingualLibrary(translationsByLocaleMap);
  }

  static empty(): BilingualLibrary {
    return new BilingualLibrary(ProximityMap.empty());
  }

  private constructor(
    private readonly translationsByLocale: ProximityMap<
      Intl.BCP47LanguageTag,
      RMap<Phrase, Phrase>
    >
  ) {}

  getForLocale(locale: LocaleLike): BilingualDictionary {
    const translations = this.translationsByLocale.get(
      ensureLanguageTag(locale)
    );

    return new BasicBilingualDictionary(translations);
  }

  get locales(): Stream<Intl.BCP47LanguageTag> {
    return this.translationsByLocale.streamKeys();
  }
}
