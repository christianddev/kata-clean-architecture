import { User } from "../../../domain/entities/User";
import { GetUsersUseCase } from "../../../domain/useCases/GetUsers";


// Mock User and UserRepository for testing purposes
const mockUser1 = User.create({
  id: '123',
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
});

const mockUser2 = User.create({
  id: '321',
  name: 'Test User 2',
  email: 'test2@example.com',
  password: 'password123',
});

const mockUsers = [mockUser1, mockUser2];

const mockUserRepository = {
  getUsers: jest.fn(),
  createUser: jest.fn(),
  getUserByEmail: jest.fn(),
};

describe('GetUsersUseCase', () => {
  let getUsersUseCase: GetUsersUseCase;

  beforeEach(() => {
    jest.clearAllMocks();

    getUsersUseCase = new GetUsersUseCase(mockUserRepository);
  });

  it('should retrieve users successfully', async () => {
    mockUserRepository.getUsers.mockResolvedValue(mockUsers);

    const result = await getUsersUseCase.run();

    expect(mockUserRepository.getUsers).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });

  it('should handle repository error', async () => {
    mockUserRepository.getUsers.mockRejectedValue(new Error('Repository error'));

    await expect(getUsersUseCase.run()).rejects.toThrow('Repository error');

    expect(mockUserRepository.getUsers).toHaveBeenCalled();
  });
});