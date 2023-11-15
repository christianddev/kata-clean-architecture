import { CreateUserUseCase } from "../domain/useCases/CreateUser";
import { GetUsersUseCase } from "../domain/useCases/GetUsers";
import { UserView } from "./UserView";

export class UserPresenter {
    view: UserView;
    createUser: CreateUserUseCase;
    getUser: GetUsersUseCase;

    constructor(
        view: UserView,
        createUser: CreateUserUseCase,
        getUser: GetUsersUseCase
    ) {
        this.view = view;
        this.createUser = createUser;
        this.getUser = getUser;
        this.initManager();
    }

    public initManager() {
        this.showWelcomeMessage();
        this.showUsers();
    }

    private showWelcomeMessage() {
        this.view.showWelcomeMessage();
    }

    private async showUsers() {
        const users = await this.getUser.run();
        this.view.showUsers(users.map(user => user.name.value));
    }

}