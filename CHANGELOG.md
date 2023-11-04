## Version 2

### Globals

- `ensureLocale()` moved to `LocaleLike.toLocale()`

- `ensureLanguageTag()` moved to `LocaleLike.toLanguageTag()`

- `getLocaleDistance()` moved to `LocaleLike.getDistance()`

### MeasureUnit

- `get()` renamed to `declineFor()`

### BilingualDictionary

- renamed to `Dictionary`

- `get()` renamed to `translate()`

### BilingualLibrary

- renamed to `DictionaryLibrary`

- `byLocale()` renamed to `byLanguageTag()`

- `getForLocale()` renamed to `getDictionary()`

- `locales` property renamed to `streamLanguageTags()` method
