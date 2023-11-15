import { User } from '../domain/entities/User';
import { UserRepository } from '../domain/repositories/UserRepository';

export class UserInMemoryRepository implements UserRepository {
    users: User[];

    constructor(){
        this.users = [];
    }

    async getUsers(): Promise<User[]> {
        return this.users;
    }

    async createUser(user: User): Promise<void> {
        this.users.push(user);
    }

    async getUserByEmail(email: string): Promise<boolean> {
        const userByEmail = this.users.find(user => user.email.value === email);

        return Boolean(userByEmail);
    }
}