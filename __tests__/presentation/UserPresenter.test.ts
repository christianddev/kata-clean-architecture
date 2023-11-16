import { CreateUserUseCase } from "../../domain/useCases/CreateUser";
import { GetUsersUseCase } from "../../domain/useCases/GetUsers";
import { UserPresenter } from "../../presentation/UserPresenter";
import { UsersView } from "../../presentation/UsersView";

export class MockUserView implements UsersView {
    showSuccess = jest.fn().mockImplementation(() => { });
    showWelcomeMessage = jest.fn().mockImplementation(() => { });
    showUsers = jest.fn().mockImplementation(() => { });
    showError = jest.fn().mockImplementation(() => { });
    requestInputName = jest.fn().mockImplementation(() => Promise.resolve('John Doe'));
    requestInputEmail = jest.fn().mockImplementation(() => Promise.resolve('john@example.com'));
    requestInputPassword = jest.fn().mockImplementation(() => Promise.resolve('password123'));
    requestInputCity = jest.fn().mockImplementation(() => Promise.resolve('City'));
    requestInputAddress = jest.fn().mockImplementation(() => Promise.resolve('123 Main St'));
    requestInputPostalCode = jest.fn().mockImplementation(() => Promise.resolve('12345'));
}

const mockUserRepository = {
    getUsers: jest.fn().mockImplementation(() => []),
    createUser: jest.fn().mockImplementation(() => []),
    getUserByEmail: jest.fn().mockImplementation(() => []),
};

const mockCreateUserUseCase = new CreateUserUseCase(mockUserRepository);
const mockGetUsersUseCase = new GetUsersUseCase(mockUserRepository);
const mockUserView = new MockUserView();

describe('UserPresenter', () => {
    let userPresenter: UserPresenter;

    beforeEach(() => {
        userPresenter = new UserPresenter(
            mockUserView,
            mockCreateUserUseCase,
            mockGetUsersUseCase
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be true', async () => {
        expect(true).toBe(true);
    });

    it('should init manager (call showWelcomeMessage & listUsersAndRequestNewUser)', async () => {
        const spyListUsersAndRequestNewUser =
            jest.spyOn((userPresenter as any), 'listUsersAndRequestNewUser').mockResolvedValue(() => { });
        const spyShowWelcomeMessage =
            jest.spyOn((userPresenter as any), 'showWelcomeMessage').mockResolvedValue(() => { });

        await userPresenter.initManager();

        expect(spyListUsersAndRequestNewUser).toHaveBeenCalled();
        expect(spyShowWelcomeMessage).toHaveBeenCalled();
    });

    it('should show welcome message', async () => {
        await (userPresenter as any).showWelcomeMessage();

        expect(mockUserView.showWelcomeMessage).toHaveBeenCalled();
    });

    it('should show users', async () => {
        await (userPresenter as any).showUsers();

        expect(mockUserView.showUsers).toHaveBeenCalledWith([]);
    });

    it('should request new user', async () => {
        const spyListUsersAndRequestNewUser =
            jest.spyOn((userPresenter as any), 'listUsersAndRequestNewUser').mockResolvedValue(() => { });

        await (userPresenter as any).requestNewUser();

        expect(mockUserView.requestInputName).toHaveBeenCalled();
        expect(mockUserView.requestInputEmail).toHaveBeenCalled();
        expect(mockUserView.requestInputPassword).toHaveBeenCalled();
        expect(mockUserView.requestInputCity).toHaveBeenCalled();
        expect(mockUserView.requestInputAddress).toHaveBeenCalled();
        expect(mockUserView.requestInputPostalCode).toHaveBeenCalled();
        expect(mockUserView.showSuccess).toHaveBeenCalled();
        expect(spyListUsersAndRequestNewUser).toHaveBeenCalled();
    });

    it('should request an error when try to create user', async () => {
        const spyRequestInputEmail =
            jest.spyOn(mockUserView, 'requestInputEmail').mockResolvedValue(() => Promise.reject("Error: email is required"));
        const spyListUsersAndRequestNewUser =
            jest.spyOn((userPresenter as any), 'listUsersAndRequestNewUser').mockResolvedValue(() => { });

        await (userPresenter as any).requestNewUser();

        expect(spyRequestInputEmail).toHaveBeenCalled();
        expect(mockUserView.showError).toHaveBeenCalledWith("Error: email is required");
        expect(spyListUsersAndRequestNewUser).toHaveBeenCalled();
    });

    it('should list users and request new user', async () => {
        const spyShowUsers =
            jest.spyOn((userPresenter as any), 'showUsers').mockResolvedValue(() => { });
        const spyRequestNewUser =
            jest.spyOn((userPresenter as any), 'requestNewUser').mockResolvedValue(() => { });

        await (userPresenter as any).listUsersAndRequestNewUser();

        expect(spyShowUsers).toHaveBeenCalled();
        expect(spyRequestNewUser).toHaveBeenCalled();
    });
});
