import { User } from "../domain/entities/User";
import { CreateUserUseCase } from "../domain/useCases/CreateUser";
import { GetUsersUseCase } from "../domain/useCases/GetUsers";
import { UsersView } from "./UsersView";

export class UserPresenter {
    view: UsersView;
    createUser: CreateUserUseCase;
    getUser: GetUsersUseCase;

    constructor(
        view: UsersView,
        createUser: CreateUserUseCase,
        getUser: GetUsersUseCase
    ) {
        this.view = view;
        this.createUser = createUser;
        this.getUser = getUser;
    }

    public async initManager() {
        this.showWelcomeMessage();
        await this.listUsersAndRequestNewUser();
    }

    private showWelcomeMessage() {
        this.view.showWelcomeMessage();
    }

    private async showUsers() {
        const users = await this.getUser.run();
        this.view.showUsers(users);
    }

    private async requestNewUser() {
        const name = await this.view.requestInputName();
        const email = await this.view.requestInputEmail();
        const password = await this.view.requestInputPassword();
        const city = await this.view.requestInputCity();
        const address = await this.view.requestInputAddress();
        const postalCode = await this.view.requestInputPostalCode();

        try {
            const user = User.create({ name, email, password, address, city, postalCode });
            await this.createUser.run(user);
            this.view.showSuccess(user);
        } catch (error) {
            this.view.showError(error.message);
        } finally {
            // TODO: review infinite loop in testing
            await this.listUsersAndRequestNewUser();
        }
    }

    private async listUsersAndRequestNewUser() {
        await this.showUsers();
        await this.requestNewUser();
    }
}