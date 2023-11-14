import { Password } from '../../ValueObject/Password';

describe('Password class tests', () => {
  it('creates an instance of Password with valid data', () => {
    const validPassword = 'Abc123123';
    const passwordInstance = Password.create(validPassword, validPassword)

    expect(passwordInstance).toBeInstanceOf(Password);
    expect(passwordInstance.value).toEqual(validPassword);
  });

  it('throws an error if password and confirmPassword does not match', () => {
    const password = 'Abc123123';
    const confirmPassword = 'Abc1231232';


    expect(() => Password.create(password, confirmPassword)).toThrow('passwords do not match');
  });

  it('throws an error if the password does not match with the regexp', () => {
    const invalidPassword = 'abc';

    expect(() => Password.create(invalidPassword, invalidPassword)).toThrow('password is not valid');
  });

  it("should return true if the instances are equal", () => {
    const password = 'Abc123123';
    const instance1 = Password.create(password, password)
    const instance2 = Password.create(password, password)
    const areEqual = instance1.equals(instance2)
    expect(areEqual).toBeTruthy()
  })

  it("should return false if the instances are not equal", () => {
    const password = 'Abc123123';
    const instance1 = Password.create(password, password)
    const password2 = '123123Abc';
    const instance2 = Password.create(password2, password2)
    const areEqual = instance1.equals(instance2)
    expect(areEqual).toBeFalsy()
  })
});