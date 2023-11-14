import { User, UserProps } from "../../../domain/entities/User";
import { UserInMemoryRepository } from "../../../infrastucture/repositories/UserInMemoryRepository";

// Mock data for testing
const mockUsers: UserProps[] = [
  { id: '1', name: 'User1', email: 'user1@example.com', password: 'Newpassword1' },
  { id: '2', name: 'User2', email: 'user2@example.com', password: 'Newpassword2' },
];

describe('UserInMemoryRepository', () => {
  let userRepository: UserInMemoryRepository;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
  });

  it('should create a new user', async () => {
    const userProps: UserProps = { name: 'NewUser', email: 'newuser@example.com', password: 'NewP12ssword1' };

    await userRepository.createUser(User.create(userProps));

    expect(userRepository.users.length).toBe(1);
    expect(userRepository.users[0]?.name.value).toBe(userProps.name);
    expect(userRepository.users[0]?.email.value).toBe(userProps.email);
  });

  it('should retrieve users successfully', async () => {
    userRepository.users = mockUsers.map((userProps) => User.create(userProps));

    const result = await userRepository.getUsers();

    expect(result.length).toBe(mockUsers.length);

    result.forEach((user, index) => {
      expect(user.name.value).toBe(mockUsers[index]?.name);
      expect(user.email.value).toBe(mockUsers[index]?.email);
    });
  });

  it('should check for user existence by email', async () => {
    userRepository.users = mockUsers.map((userProps) => User.create(userProps));

    const emailExists = await userRepository.getUserByEmail(mockUsers[0]!.email);
    expect(emailExists).toBe(true);

    const nonExistingEmailExists = await userRepository.getUserByEmail('nonexisting@example.com');
    expect(nonExistingEmailExists).toBe(false);
  });
});
