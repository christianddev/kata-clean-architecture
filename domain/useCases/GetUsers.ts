import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class GetUsersUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    async run(): Promise<User[]> {
        return this.userRepository.getUsers();
    }
}