
import { Address } from "../../../domain/valueObjects/Address";

const validAddress = {
  address: '5th Avenue',
  city: 'New York',
  postalCode: '00',
};

const invalidAddress = {
  ...validAddress,
  city: ''
}

const validAddress2 = {
  ...validAddress,
  city: 'Washington'
}

describe('Address class tests', () => {
  it('creates an instance of Address with valid data', () => {
    const addressInstance = Address.create(validAddress.address, validAddress.postalCode, validAddress.city);

    expect(addressInstance).toBeInstanceOf(Address);
    expect(addressInstance.address).toEqual(validAddress.address);
    expect(addressInstance.city).toEqual(validAddress.city);
    expect(addressInstance.postalCode).toEqual(validAddress.postalCode);

  });

  it('throws an error if the Address is not valid', () => {


    expect(() => Address.create(invalidAddress.address, invalidAddress.postalCode, invalidAddress.city)).toThrow(/address, postal code, and city are required/i);
  });

  it("should return true if the instances are equal", () => {
    const instance1 = Address.create(validAddress.address, validAddress.postalCode, validAddress.city);
    const instance2 = Address.create(validAddress.address, validAddress.postalCode, validAddress.city);
    const areEqual = instance1.equals(instance2);
    expect(areEqual).toBe(true);
  })

  it("should return false if the instances are not equal", () => {
    const instance1 = Address.create(validAddress.address, validAddress.postalCode, validAddress.city);
    const instance2 = Address.create(validAddress2.address, validAddress2.postalCode, validAddress2.city);
    const areEqual = instance1.equals(instance2);
    expect(areEqual).toBe(false);
  })
});