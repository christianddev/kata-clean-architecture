import { User } from "../../../domain/entities/User";
import { CreateUserUseCase } from "../../../domain/useCases/CreateUser";


// Mock User and UserRepository for testing purposes
const mockUser = User.create({
  id: '123',
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
});

const mockUserRepository = {
  getUsers: jest.fn(),
  createUser: jest.fn(),
  getUserByEmail: jest.fn(),
};

describe('AddUserUseCase', () => {
  let addUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    jest.clearAllMocks();

    addUserUseCase = new CreateUserUseCase(mockUserRepository);
  });

  it('should add a new user successfully', async () => {
    mockUserRepository.getUserByEmail.mockResolvedValue(false);

    await addUserUseCase.run(mockUser);

    expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(mockUser.email.value);
    expect(mockUserRepository.createUser).toHaveBeenCalledWith(mockUser);
  });

  it('should throw an error when trying to add an existing user', async () => {
    mockUserRepository.getUserByEmail.mockResolvedValue(true);

    await expect(addUserUseCase.run(mockUser)).rejects.toThrow('User aleady exists');

    expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(mockUser.email.value);
    expect(mockUserRepository.createUser).not.toHaveBeenCalled();
  });
});
