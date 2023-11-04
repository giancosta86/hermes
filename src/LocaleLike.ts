import { ProximityMap } from "@rimbu/proximity";

export type LocaleLike = Intl.BCP47LanguageTag | Intl.Locale;

export type Language = string;

export namespace LocaleLike {
  export const languageFacets: readonly (keyof Intl.Locale)[] = [
    "calendar",
    "caseFirst",
    "collation",
    "hourCycle",
    "numberingSystem",
    "numeric",
    "region",
    "script"
  ];

  export function createProximityContext() {
    return ProximityMap.createContext({
      distanceFunction: LocaleLike.getDistance
    });
  }

  export function toLocale(localeLike: LocaleLike): Intl.Locale {
    return localeLike instanceof Intl.Locale
      ? localeLike
      : new Intl.Locale(localeLike);
  }

  export function toLanguageTag(localeLike: LocaleLike): Intl.BCP47LanguageTag {
    return localeLike instanceof Intl.Locale
      ? localeLike.toString()
      : localeLike;
  }

  export function getDistance(one: LocaleLike, another: LocaleLike): number {
    const oneLocale = toLocale(one);
    const anotherLocale = toLocale(another);

    if (oneLocale.language != anotherLocale.language) {
      return Number.POSITIVE_INFINITY;
    }

    return languageFacets.reduce(
      (cumulated, facet) =>
        oneLocale[facet] !== anotherLocale[facet] ? cumulated + 1 : cumulated,
      0
    );
  }
}
