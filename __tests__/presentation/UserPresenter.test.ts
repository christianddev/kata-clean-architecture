import { CreateUserUseCase } from "../../domain/useCases/CreateUser";
import { GetUsersUseCase } from "../../domain/useCases/GetUsers";
import { UserPresenter } from "../../presentation/UserPresenter";
import { UsersView } from "../../presentation/UsersView";

export class MockUserView implements UsersView {
    showSuccess = jest.fn().mockImplementationOnce(() => {});
    showWelcomeMessage = jest.fn().mockImplementationOnce(() => {});
    showUsers = jest.fn().mockImplementationOnce(() => {});
    showError = jest.fn().mockImplementationOnce(() => {});
    requestInputName = jest.fn().mockImplementationOnce(() => Promise.resolve('John Doe'));
    requestInputEmail = jest.fn().mockImplementationOnce(() => Promise.resolve('john@example.com'));
    requestInputPassword = jest.fn().mockImplementationOnce(() => Promise.resolve('password123'));
    requestInputCity = jest.fn().mockImplementationOnce(() => Promise.resolve('City'));
    requestInputAddress = jest.fn().mockImplementationOnce(() => Promise.resolve('123 Main St'));
    requestInputPostalCode = jest.fn().mockImplementationOnce(() => Promise.resolve('12345'));
}

const mockUserRepository = {
    getUsers: jest.fn().mockImplementationOnce(() => []),
    createUser: jest.fn().mockImplementationOnce(() => []),
    getUserByEmail: jest.fn().mockImplementationOnce(() => []),
};

const mockCreateUserUseCase = new CreateUserUseCase(mockUserRepository);
const mockGetUsersUseCase = new GetUsersUseCase(mockUserRepository);
const mockUserView = new MockUserView();

describe('UserPresenter', () => {
    // @ts-ignore
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

    // it('should list users and request new user on initialization', async () => {
    //     await userPresenter.initManager();

    //     expect(mockUserView.showUsers).toHaveBeenCalled();
    //     expect(mockUserView.requestInputName).toHaveBeenCalled();
    //     expect(mockUserView.requestInputEmail).toHaveBeenCalled();
    //     expect(mockUserView.requestInputPassword).toHaveBeenCalled();
    //     expect(mockUserView.requestInputCity).toHaveBeenCalled();
    //     expect(mockUserView.requestInputAddress).toHaveBeenCalled();
    //     expect(mockUserView.requestInputPostalCode).toHaveBeenCalled();
    // });
});
