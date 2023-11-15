import { UserInMemoryRepository } from "./data/UserInMemoryRepository";
import { CreateUserUseCase } from "./domain/useCases/CreateUser";
import { GetUsersUseCase } from "./domain/useCases/GetUsers";
import { UserPresenter } from "./presentation/UserPresenter";
import { UsersView } from './presentation/UsersView';


export class CompositionRoot {
    static provideUserPresenter(view: UsersView) {
        const userRepository = new UserInMemoryRepository();
        const addUserCase = new CreateUserUseCase(userRepository);
        const getUserCase = new GetUsersUseCase(userRepository);

        return new UserPresenter(view, addUserCase, getUserCase)
    }
}