import { Email } from '../../ValueObject/Email';

describe('Email class tests', () => {
  it('creates an instance of Email with valid email', () => {
    const validEmail = 'test@example.com';
    const emailInstance = Email.create(validEmail);

    expect(emailInstance).toBeInstanceOf(Email);
    expect(emailInstance.value).toEqual(validEmail);
  });

  it('throws an error for an empty email', () => {
    const emptyEmail = '';

    expect(() => Email.create(emptyEmail)).toThrow('Email is empty.');
  });

  it('throws an error for an invalid email', () => {
    const invalidEmail = 'invalid-email';

    expect(() => Email.create(invalidEmail)).toThrow('Email is not valid.');
  });

  it('formats the email correctly', () => {
    const mixedCaseEmail = 'TeSt@ExAmPlE.com';
    const formattedEmail = 'test@example.com';

    const emailInstance = Email.create(mixedCaseEmail);

    expect(emailInstance.value).toEqual(formattedEmail);
  });

  it("should return true if the instances are equal", () => {
    const instance1 = Email.create("email@Email.com");
    const instance2 = Email.create("email@Email.com");
    const areEqual = instance1.equals(instance2);
    expect(areEqual).toBe(true);
  })

  it("should return false if the instances are not equal", () => {
    const instance1 = Email.create("abc@Email.com");
    const instance2 = Email.create("123@Email.com");
    const areEqual = instance1.equals(instance2);
    expect(areEqual).toBe(false);
  })
});