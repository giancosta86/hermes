# hermes

_Minimalist i18n in TypeScript_

![GitHub CI](https://github.com/giancosta86/hermes/actions/workflows/publish-to-npm.yml/badge.svg)
[![npm version](https://badge.fury.io/js/@giancosta86%2Fhermes.svg)](https://badge.fury.io/js/@giancosta86%2Fhermes)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)

**hermes** is a TypeScript library tackling the issues of _internationalization_ (**i18n**) with minimalist and elegant tools.

## Installation

```bash
npm install @giancosta86/hermes
```

or

```bash
yarn add @giancosta86/hermes
```

The public API entirely resides in the root package index, so one shouldn't reference specific modules.

## Usage

- `IsoDateFormat`: formats `IsoDate` objects - as defined in [time-utils](https://github.com/giancosta86/time-utils). It can be constructed with the same options as `DateTimeFormat` - also supporting reasonable defaults

- `Noun`: defines a noun - which can have a _singular_ and a _plural_ form. Case-based declension is not supported at present, but one can use case-keyed maps of `Noun` values

- `MeasureUnit` takes a `Noun` and provides a `get()` method, which returns:

  - the `singular` form if the value is +1 or -1

  - the `plural` form otherwise

- `Language` is a semantically useful type alias for `string`

- `LocaleLike` - can be either a [BCP47](https://en.wikipedia.org/wiki/IETF_language_tag) **language tag** string or an `Ìntl.Locale` object

- `localeNuances` is an array containing the i18n-related properties of an `Intl.Locale` instance _except_ the `language` attribute

- `ensureLocale()` takes a `LocaleLike` and always returns an `Intl.Locale`

- `ensureLanguageTag()` takes a `LocaleLike` and returns its BCP47 language tag

- `getLocaleDistance()` takes two `LocaleLike`, converts them to `Intl.Locale` and returns:

  - `Number.POSITIVE_INFINITY` if the two `language` attributes are different

  - `0` if all the other i18n-related attributes (`localeNuances`) are equal, otherwise `+1` is added for every non-matching attribute

- `BilingualLibrary` is a library of `BilingualDictionary` instances and can be built via static methods; additionally, `Phrase` is just a type alias for `string` that identifies each side of a dictionary translation.

  Each dictionary can be retrieved from a library via a `LocaleLike` - not necessarily via an exact match, but by _proximity_: the dictionary registered with the _most matching_ locale (shorter or longer) is returned; the proximity is computed with `getLocaleDistance()`, as described above.

  If a library is requested an unregistered locale, an empty dictionary is returned; if a dictionary is requested a phrase it does not contain, the original phrase itself is returned.

## Further references

- [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) - Standardized codes that are used to identify human languages

- [time-utils](https://github.com/giancosta86/time-utils) - Time-related utilities

- [Rimbu](https://rimbu.org/) - Immutable collections and tools for TypeScript
