import { UserInMemoryRepository } from "./data/UserInMemoryRepository";
import { CreateUserUseCase } from "./domain/useCases/CreateUser";
import { GetUsersUseCase } from "./domain/useCases/GetUsers";
import { UserPresenter } from "./presentation/UserPresenter";
import { UserViewTerminal } from "./presentation/UserViewTerminal";


export class CompositionRoot {
    static provideUserPresenter() {
        const usersView = new UserViewTerminal();        
        const userRepository = new UserInMemoryRepository();
        const addUserCase = new CreateUserUseCase(userRepository);
        const getUserCase = new GetUsersUseCase(userRepository);

        return new UserPresenter(usersView, addUserCase, getUserCase)
    }
}