import UserRepository from "../../Repositories/UserRepository";
import { User } from "../Entities/User";
import UseCase from "./shared/UseCase";

interface AddUserProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class AddUser implements UseCase<AddUserProps> {

    constructor(private userRepository: UserRepository<User>){}

    async run(props: AddUserProps): Promise<void> {
        // TODO: apply validations
        const userData = {
            name: props.name,
            email: props.email,
            password: props.password,
            confirmPassword: props.confirmPassword

        }
        await this.userRepository.createUser(userData)
    }

}