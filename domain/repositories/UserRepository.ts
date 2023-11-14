export interface UserRepository<User> {
  getUsers(): Promise<User[]>;

  createUser(user: User): Promise<void>;

  getUserByEmail(email: string): Promise<User>;
}