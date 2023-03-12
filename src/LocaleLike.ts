export type LocaleLike = Intl.BCP47LanguageTag | Intl.Locale;

export type Language = string;

export const localeNuances: readonly (keyof Intl.Locale)[] = [
  "calendar",
  "caseFirst",
  "collation",
  "hourCycle",
  "numberingSystem",
  "numeric",
  "region",
  "script"
];

export function ensureLocale(localeLike: LocaleLike): Intl.Locale {
  return localeLike instanceof Intl.Locale
    ? localeLike
    : new Intl.Locale(localeLike);
}

export function ensureLanguageTag(
  localeLike: LocaleLike
): Intl.BCP47LanguageTag {
  return localeLike instanceof Intl.Locale ? localeLike.toString() : localeLike;
}

export function getLocaleDistance(
  one: LocaleLike,
  another: LocaleLike
): number {
  const oneLocale = ensureLocale(one);
  const anotherLocale = ensureLocale(another);

  if (oneLocale.language != anotherLocale.language) {
    return Number.POSITIVE_INFINITY;
  }

  return localeNuances.reduce(
    (cumulated, nuance) =>
      oneLocale[nuance] !== anotherLocale[nuance] ? cumulated + 1 : cumulated,
    0
  );
}
