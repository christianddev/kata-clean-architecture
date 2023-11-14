import { UserData } from "../Domain/Entities/User";

export default interface UserRepository<T = any> {
    getUsers(): Promise<T[]>;
    createUser(props: UserData): Promise<T>
  }