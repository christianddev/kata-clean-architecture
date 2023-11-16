import * as readLine from 'readline';

import { UsersViewTerminal } from "../../presentation/UsersViewTerminal";
import { colours } from "../../utils/colors";
import { User } from '../../domain/entities/User';


const mockUser = User.create({
    id: '123',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    address: 'Alcalá',
    city: 'Madrid',
    postalCode: '88080',
});

describe('UsersViewTerminal', () => {
    let usersViewTerminal: UsersViewTerminal;
    let rl: readLine.Interface;

    const spyConsole = jest.spyOn(console, 'log').mockImplementation(() => { });

    beforeEach(() => {
        rl = readLine.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        usersViewTerminal = new UsersViewTerminal(rl);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should show welcome message', async () => {
        await usersViewTerminal.showWelcomeMessage();

        expect(spyConsole).toHaveBeenCalledWith('Welcome to the user manager!');
    });

    it('should show error', async () => {
        await usersViewTerminal.showError('Error message');

        expect(spyConsole).toHaveBeenCalledWith(colours.bg.black, colours.fg.red);
        expect(spyConsole).toHaveBeenCalledWith('\nOops!! Something went wrong...');
        expect(spyConsole).toHaveBeenCalledWith('Error message\n', colours.reset);
    });

    it('should show success', async () => {
        await usersViewTerminal.showSuccess(mockUser);

        expect(spyConsole).toHaveBeenCalledWith(colours.bg.black, colours.fg.green);
        expect(spyConsole).toHaveBeenCalledWith(`User with the email <<${mockUser.email.value}>> created successfully`, colours.reset);
    });

    it('should show users', async () => {
        await usersViewTerminal.showUsers([mockUser]);

        expect(spyConsole).toHaveBeenCalledWith('\n::::: Users :::::');
        expect(spyConsole).toHaveBeenCalledWith(` => Name: ${mockUser.name.value}`);
        expect(spyConsole).toHaveBeenCalledWith(` => Email: ${mockUser.email.value}`);
        expect(spyConsole).toHaveBeenCalledWith(` => City: ${mockUser.address.city}`);
        expect(spyConsole).toHaveBeenCalledWith(` => Address: ${mockUser.address.address}`);
        expect(spyConsole).toHaveBeenCalledWith(` => Postal code: ${mockUser.address.postalCode}`);
        expect(spyConsole).toHaveBeenCalledWith('_________________________\n');
        expect(spyConsole).toHaveBeenCalledWith(':::::::::::::::::\n');
    });

    it('should resolve with postal code', async () => {
        rl.question = jest.fn().mockImplementationOnce(
            (_question: string, callback: Function) => {
                callback("12345");
            });

        const postalCode = await usersViewTerminal.requestInputPostalCode();
        expect(postalCode).toBe('12345');
        expect(rl.question).toHaveBeenCalledWith('Enter Postal code: ', expect.any(Function));
    });

    it('should resolve with address', async () => {
        rl.question = jest.fn().mockImplementationOnce(
            (_question: string, callback: Function) => {
                callback("Test Address");
            });

        const address = await usersViewTerminal.requestInputAddress();
        expect(address).toBe('Test Address');
        expect(rl.question).toHaveBeenCalledWith('Enter Address: ', expect.any(Function));
    });

    it('should resolve with city', async () => {
        rl.question = jest.fn().mockImplementationOnce(
            (_question: string, callback: Function) => {
                callback("Test City");
            });

        const city = await usersViewTerminal.requestInputCity();
        expect(city).toBe('Test City');
        expect(rl.question).toHaveBeenCalledWith('Enter City: ', expect.any(Function));
    });

    it('should resolve with password', async () => {
        rl.question = jest.fn().mockImplementationOnce(
            (_question: string, callback: Function) => {
                callback("Test Password");
            });

        const password = await usersViewTerminal.requestInputPassword();
        expect(password).toBe('Test Password');
        expect(rl.question).toHaveBeenCalledWith('Enter Password: ', expect.any(Function));
    });
});
