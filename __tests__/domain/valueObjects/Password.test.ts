import { Password } from "../../../domain/valueObjects/Password";

describe('Password class tests', () => {
  it('creates an instance of Password with valid data', () => {
    const validPassword = 'Abc123123';
    const passwordInstance = Password.create(validPassword)

    expect(passwordInstance).toBeInstanceOf(Password);
    expect(passwordInstance.value).toEqual(validPassword);
  });

  it('throws an error if the password does not match with the regexp', () => {
    const invalidPassword = 'abc';

    expect(() => Password.create(invalidPassword)).toThrow('password is not valid');
  });

  it("should return true if the instances are equal", () => {
    const password = 'Abc123123';
    const instance1 = Password.create(password);
    const instance2 = Password.create(password);
    const areEqual = instance1.equals(instance2);
    expect(areEqual).toBe(true);
  })

  it("should return false if the instances are not equal", () => {
    const password = 'Abc123123';
    const instance1 = Password.create(password);
    const password2 = '123123Abc';
    const instance2 = Password.create(password2);
    const areEqual = instance1.equals(instance2);
    expect(areEqual).toBe(false);
  })
});