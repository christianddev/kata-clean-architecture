import { User } from '../../../domain/entities/User';
import { Email } from '../../../domain/valueObjects/Email';
import { Name } from '../../../domain/valueObjects/Name';
import { Password } from '../../../domain/valueObjects/Password';


describe("User", () => {
  const validUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'Passw0rd2',
    address: 'Alcalá', 
    city: 'Madrid', 
    postalCode: '88080',
  };

  it("should create an instance of user", () => {
    const user = User.create(validUserData)

    expect(user).toBeInstanceOf(User)
  })

  it("should return an error if the email is not valid", () => {
    const userDataWithoutEmail = {
        ...validUserData,
        email: 'invalid-email',
    };

    expect(() => User.create(userDataWithoutEmail)).toThrow(/email is not valid/i)
  })

  it('creates an instance of User with valid data', () => {
    const userInstance = User.create(validUserData);

    expect(userInstance).toBeInstanceOf(User);
    expect(userInstance.id).toHaveLength(36);
    expect(userInstance.name).toBeInstanceOf(Name);
    expect(userInstance.email).toBeInstanceOf(Email);
    expect(userInstance.password).toBeInstanceOf(Password);
  });

  it('throws an error for missing email during creation', () => {
    const userDataWithoutEmail = {
      ...validUserData,
      email: '',
    };

    expect(() => User.create(userDataWithoutEmail)).toThrow(/email is required/i);
  });

  it('throws an error for missing name during creation', () => {
    const userDataWithoutName = {
      ...validUserData,
      name: '',
    };

    expect(() => User.create(userDataWithoutName)).toThrow(/name is required/i);
  });

  it('throws an error for missing password during creation', () => {
    const userDataWithoutPassword = {
      ...validUserData,
      password: '',
      confirmPassword: '',
    };

    expect(() => User.create(userDataWithoutPassword)).toThrow(/password is required/i);
  });

  it('should update only the user email', () => {
    const initialUserProps = {
      ...validUserData,
    };

    const userInstance = User.create(initialUserProps);

    const updatedUserData = {
      id: '123',
      email: Email.create('updated.email@example.com'),
    };

    const updatedUser = userInstance.update(updatedUserData);

    expect(updatedUser).toBeInstanceOf(User);
    expect(updatedUser.id).toHaveLength(36);
    expect(updatedUser.name.value).toEqual(initialUserProps.name);
    expect(updatedUser.email.value).toEqual('updated.email@example.com');
    expect(updatedUser.password.value).toEqual(initialUserProps.password);
  });

  it('should update only the user name', () => {
    const initialUserProps = {
      ...validUserData,
    };

    const userInstance = User.create(initialUserProps);

    const updatedUserData = {
      id: '123',
      name: Name.create('Updated Name'),
    };

    const updatedUser = userInstance.update(updatedUserData);

    expect(updatedUser).toBeInstanceOf(User);
    expect(updatedUser.id).toHaveLength(36);
    expect(updatedUser.name.value).toEqual('Updated Name');
    expect(updatedUser.email.value).toEqual(initialUserProps.email);
    expect(updatedUser.password.value).toEqual(initialUserProps.password);
  });

  it('should update only the user password', () => {
    const initialUserProps = {
      ...validUserData,
    };

    const userInstance = User.create(initialUserProps);

    const updatedUserData = {
      id: '123',
      password: Password.create('UpdatedPAssw0rd'),
    };

    const updatedUser = userInstance.update(updatedUserData);

    expect(updatedUser).toBeInstanceOf(User);
    expect(updatedUser.id).toHaveLength(36);
    expect(updatedUser.name.value).toEqual(initialUserProps.name);
    expect(updatedUser.email.value).toEqual(initialUserProps.email);
    expect(updatedUser.password.value).toEqual('UpdatedPAssw0rd');
  });

  it('should update all the user properties', () => {
    const initialUserProps = {
      ...validUserData,
    };

    const userInstance = User.create(initialUserProps);

    const updatedUserData = {
      id: '123',
      email: Email.create('updated.email@example.com'),
      name: Name.create('Updated Name'),
      password: Password.create('UpdatedPAssw0rd'),
    };

    const updatedUser = userInstance.update(updatedUserData);

    expect(updatedUser).toBeInstanceOf(User);
    expect(updatedUser.id).toHaveLength(36);
    expect(updatedUser.name.value).toEqual('Updated Name');
    expect(updatedUser.email.value).toEqual('updated.email@example.com');
    expect(updatedUser.password.value).toEqual('UpdatedPAssw0rd');
  });

  it("should return true if the instances are equal", () => {
    const initialUserProps = {
      ...validUserData,
      id: 'unique-id-123',
    };

    const instance1 = User.create(initialUserProps);
    const instance2 = User.create(initialUserProps);
    const areEqual = instance1.equals(instance2);
    expect(areEqual).toBe(true);
  })
  
  it("should return false if the instances are not equal", () => {
    const initialUserProps = {
      ...validUserData,
    };

    const instance1 = User.create(initialUserProps);
    const instance2 = User.create(initialUserProps);
    const areEqual = instance1.equals(instance2);
    expect(areEqual).toBe(false);
  })
});