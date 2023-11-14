import { User } from "../../../domain/entities/User";
import { CreateUserUseCase } from "../../../domain/useCases/CreateUser";


// Mock User and UserRepository for testing purposes
const mockUser = User.create({
  id: '123',
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  address: 'Alcalá',
  city: 'Madrid',
  postalCode: '88080',
});

const mockUser2 = User.create({
  id: '123',
  name: 'Test User',
  email: 'test2@example2.com',
  password: 'password123',
  address: 'Alcalá',
  city: 'Madrid',
  postalCode: '88080',
});

const mockUser3 = User.create({
  id: '123',
  name: 'Test User',
  email: 'test@repeated-domain.com',
  password: 'password123',
  address: 'Alcalá',
  city: 'Madrid',
  postalCode: '88080',
});

const mockUser4 = User.create({
  id: '123',
  name: 'Test User',
  email: 'test2@repeated-domain.com',
  password: 'password123',
  address: 'Alcalá',
  city: 'Madrid',
  postalCode: '88080',
});

const mockUserRepository = {
  getUsers: jest.fn().mockImplementation(() => [mockUser2, mockUser3]),
  createUser: jest.fn(),
};

describe('AddUserUseCase', () => {
  let addUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    jest.clearAllMocks();

    addUserUseCase = new CreateUserUseCase(mockUserRepository);
  });

  it('should add a new user successfully', async () => {
    await addUserUseCase.run(mockUser);

    expect(mockUserRepository.createUser).toHaveBeenCalledWith(mockUser);
  });

  it('should throw an error when trying to add an existing user with the same email', async () => {
    await expect(addUserUseCase.run(mockUser2)).rejects.toThrow('User aleady exists');

    expect(mockUserRepository.createUser).not.toHaveBeenCalled();
  });

  it('should throw an error when trying to add an existing user with the same domain', async () => {
    await expect(addUserUseCase.run(mockUser4)).rejects.toThrow('User with same domain');

    expect(mockUserRepository.createUser).not.toHaveBeenCalled();
  });
});
