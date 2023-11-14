import { User } from "../entities/User";

export interface UserRepository {
  getUsers(): Promise<User[]>;

  createUser(user: User): Promise<void>;

  getUserByEmail(email: string): Promise<User>;
}