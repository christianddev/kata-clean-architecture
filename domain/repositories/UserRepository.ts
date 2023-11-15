import { User } from "domain/entities/User";

export interface UserRepository {
  getUsers(): Promise<User[]>;

  createUser(user: User): Promise<void>;

  // getUserByEmail(email: string): Promise<boolean>;
}