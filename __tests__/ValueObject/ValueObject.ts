import { ValueObject, ValueObjectProps } from "../../ValueObject/ValueObject";

class SampleValueObject extends ValueObject<any> {
  constructor(props: ValueObjectProps) {
    super(props);
  }
}

describe('ValueObject Class', () => {
  const sampleProps: ValueObjectProps = { key1: 'value1', key2: 'value2' };

  it('equals method returns true for value objects with the same properties', () => {
    const valueObject1 = new SampleValueObject(sampleProps);
    const valueObject2 = new SampleValueObject(sampleProps);

    expect(valueObject1.equals(valueObject2)).toBe(true);
  });

  it('equals method returns false for value objects with different properties', () => {
    const valueObject1 = new SampleValueObject({ key1: 'value1' });
    const valueObject2 = new SampleValueObject({ key2: 'value2' });

    expect(valueObject1.equals(valueObject2)).toBe(false);
  });

  it('equals method returns false for null or undefined', () => {
    const valueObject1 = new SampleValueObject(sampleProps);

    expect(valueObject1.equals(null as any)).toBe(false);
    expect(valueObject1.equals(undefined)).toBe(false);
  });

  it('equals method returns false for non-ValueObject objects', () => {
    const valueObject1 = new SampleValueObject(sampleProps);
    const nonValueObject: ValueObjectProps = { key: 'value' };

    expect(valueObject1.equals(nonValueObject as any)).toBe(false);
  });
});