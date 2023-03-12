import { MeasureUnit } from "./MeasureUnit";
import { Noun } from "./Noun";

const testUnitNoun: Noun = {
  singular: "kilogram",
  plural: "kilograms"
};

describe.each<{ form: keyof Noun; values: readonly number[] }>([
  {
    form: "singular",
    values: [-1, +1]
  },
  {
    form: "plural",
    values: [0, 0.5, -0.5, 1.5, -1.5, 2, -2]
  }
])("Declining a measure unit", ({ form, values }) => {
  describe.each(values)("when the value is %p", value => {
    it(`should be ${form}`, () => {
      const testUnit = new MeasureUnit(testUnitNoun);

      const declinedForm = testUnit.get(value);

      expect(declinedForm).toBe(testUnitNoun[form]);
    });
  });
});
