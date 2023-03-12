import { IsoDate } from "@giancosta86/time-utils";

const defaultFormatOptions: Readonly<Intl.DateTimeFormatOptions> = {
  day: "numeric",
  month: "long",
  year: "numeric"
};

export class IsoDateFormat {
  private readonly options: Readonly<Intl.DateTimeFormatOptions>;

  constructor(
    private readonly locale: Intl.LocalesArgument,
    options?: Readonly<Intl.DateTimeFormatOptions>
  ) {
    this.options = options ?? defaultFormatOptions;
  }

  format(isoDate: IsoDate): string {
    return isoDate.unboxed.toLocaleString(this.locale, this.options);
  }
}
