# hermes

_Minimalist i18n in TypeScript_

![GitHub CI](https://github.com/giancosta86/hermes/actions/workflows/publish-to-npm.yml/badge.svg)
[![npm version](https://badge.fury.io/js/@giancosta86%2Fhermes.svg)](https://badge.fury.io/js/@giancosta86%2Fhermes)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)

**hermes** is a TypeScript library tackling the issues of _internationalization_ (**i18n**) with minimalist and elegant tools.

## Installation

The package on NPM is:

> @giancosta86/hermes

The public API entirely resides in the root package index, so one shouldn't reference specific modules.

## Usage

- `IsoDateFormat`: formats `IsoDate` objects - as defined in [time-utils](https://github.com/giancosta86/time-utils). It can be constructed with the same options as `DateTimeFormat` - also supporting reasonable defaults in its `defaultOptions` static property

- `Noun`: defines a noun - which can have a _singular_ and a _plural_ form. Case-based declension is not supported at present, but one can use case-keyed maps of `Noun` values

- `MeasureUnit` takes a `Noun` and provides a `declineFor()` method, which returns:

  - the `singular` form if the value is +1 or -1

  - the `plural` form otherwise

- `Language` is a semantically useful type alias for `string`

- `LocaleLike` - can be either a [BCP47](https://en.wikipedia.org/wiki/IETF_language_tag) **language tag** string or an `Ìntl.Locale` object; its namespace provides:

  - `languageFacets`: an array containing the i18n-related attribute names of an `Intl.Locale` instance _except_ the `language` attribute

  - `toLocale()` takes a `LocaleLike` and always returns an `Intl.Locale`

  - `toLanguageTag()` takes a `LocaleLike` and returns its BCP47 language tag

  - `getDistance()` takes two `LocaleLike`, converts them to `Intl.Locale` and returns:

    - `Number.POSITIVE_INFINITY` if the two `language` attributes are different

    - `0` if all the other i18n-related attributes (`languageFacets`) are equal, otherwise `+1` is added for every non-matching attribute

  - `createProximityContext()`: creates a context for a `ProximityMap` based

- The `Dictionary` class provides:

  - `translate(<phrase string>)`: to return the translation registered for the given phrase; if a translation is not registered, the original phrase itself is returned

  - `toRawTranslations()`: returns an object whose keys are the registered phrases, with the related translations as values; the returned type is `RawTranslations`

- `DictionaryLibrary` is a container of virtually illimited `Dictionary` instances - and can only be built via static methods.

  Each dictionary can be retrieved from a library via `getDictionary(LocaleLike)` - not necessarily via an exact match, but by _proximity_: the dictionary registered with the _most matching_ locale (shorter or longer) is returned; proximity is computed with `LocaleLike.getDistance()`, as described above.

  The registered locales are returned by the `streamLocales()` method; if a library is requested an unregistered locale, an empty dictionary is returned - so translations will always return the requested phrase itself.

## Further references

- [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) - Standardized codes that are used to identify human languages

- [time-utils](https://github.com/giancosta86/time-utils) - Time-related utilities

- [Rimbu](https://rimbu.org/) - Immutable collections and tools for TypeScript
