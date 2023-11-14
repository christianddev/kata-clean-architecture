import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class AddUserUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    async run(user: User): Promise<void> {
        const existingUser = await this.userRepository.getUserByEmail(user.email.value);

        if(existingUser) {
            throw new Error("User aleady exists");
        }

        this.userRepository.createUser(user);
    }

}