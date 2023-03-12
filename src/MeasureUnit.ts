import { Noun } from "./Noun";

export class MeasureUnit {
  constructor(private readonly noun: Noun) {}

  get(quantity: number): string {
    return Math.abs(quantity) == 1 ? this.noun.singular : this.noun.plural;
  }
}
