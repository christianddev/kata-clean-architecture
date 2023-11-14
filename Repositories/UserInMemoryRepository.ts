import { User, UserCredentials, UserData } from '../Domain/Entities/User';
import UserRepository from './UserRepository';


export class UserInMemoryRepository implements UserRepository<UserCredentials> {
    storedUsers: Map<string, UserCredentials>;

    constructor(){
        this.storedUsers = new Map();
    }

    
    public async getUsers(): Promise<UserCredentials[]> {
        return Array.from(this.storedUsers.values());
    }

    public async createUser(props: UserData): Promise<UserCredentials> {
        try {
            const userExists = this.storedUsers.has(props.email);

            if(userExists) {
                throw new Error("User email already exists");
            }

            const newUser = User.create(props);
            this.storedUsers.set(newUser.email.value, newUser.toPrimitive());

            return newUser.toPrimitive();
        } catch (error) {
            throw new Error("Error while creating the user");
        }
    }

}