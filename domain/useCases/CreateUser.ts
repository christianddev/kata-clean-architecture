import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class CreateUserUseCase {
    private userRepository: UserRepository<User>;

    constructor(userRepository: UserRepository<User>){
        this.userRepository = userRepository;
    }

    async run(user: User): Promise<void> {
        const users = await this.userRepository.getUsers();

        const userWithSameEmail = users.find(usr => usr.email.value === user.email.value);
        const userDomain = user.email.value.split('@').pop()!;
        const userWithSameDomain = users.find(usr => usr.email.value.includes(userDomain));

        if(userWithSameEmail) {
            throw new Error("User aleady exists");
        }

        if(userWithSameDomain) {
            throw new Error("User with same domain");
        }
        
        this.userRepository.createUser(user);
    }

}