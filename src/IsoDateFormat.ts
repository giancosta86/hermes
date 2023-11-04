import { IsoDate } from "@giancosta86/time-utils";

export class IsoDateFormat {
  static readonly defaultOptions: Readonly<Intl.DateTimeFormatOptions> = {
    day: "numeric",
    month: "long",
    year: "numeric"
  };

  private readonly options: Readonly<Intl.DateTimeFormatOptions>;

  constructor(
    private readonly locale: Intl.LocalesArgument,
    options?: Readonly<Intl.DateTimeFormatOptions>
  ) {
    this.options = options ?? IsoDateFormat.defaultOptions;
  }

  format(isoDate: IsoDate): string {
    return isoDate.unboxed.toLocaleString(this.locale, this.options);
  }
}
