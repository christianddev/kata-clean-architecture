import * as readLine from 'readline';
import { UsersView } from './UsersView';
import { User } from '../domain/entities/User';
import { CompositionRoot } from '../CompositionRoot';
import { colours } from '../utils/colors';

export class UsersViewTerminal implements UsersView {
    private userPresenter = CompositionRoot.provideUserPresenter(this);

    private rl: readLine.Interface;

    constructor(readline: readLine.Interface) {
        this.rl = readline;
    }


    async initialize() {
        await this.userPresenter.initManager();
    }


    showWelcomeMessage(): void {
        console.log('Welcome to the user manager!');
    }

    showError(message: string): void {
        console.log(colours.bg.black, colours.fg.red,);
        console.log('\nOops!! Something went wrong...');
        console.log(`${message}\n`, colours.reset);
    }

    showSuccess(user: User): void {
        console.log(colours.bg.black, colours.fg.green);
        console.log(`User with the email <<${user.email.value}>> created successfully`, colours.reset)
    }

    showUsers(users: User[]): void {
        console.log('\n::::: Users :::::');
        if (users.length === 0) console.log('There are no users');
        else users.forEach(user => this.printUser(user));
        console.log(':::::::::::::::::\n');
    }

    private printUser(user: User) {
        console.log(` => Name: ${user.name.value}`);
        console.log(` => Email: ${user.email.value}`);
        console.log(` => City: ${user.address.city}`);
        console.log(` => Address: ${user.address.address}`);
        console.log(` => Postal code: ${user.address.postalCode}`);
        console.log('_________________________\n');
    }

    requestInputName(): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question('Enter name: ', (answer) => {
                resolve(answer);
            });
        });
    }

    requestInputEmail(): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question('Enter Email: ', (answer) => {
                resolve(answer);
            });
        });
    }

    requestInputPassword(): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question('Enter Password: ', (answer) => {
                resolve(answer);
            });
        });
    }

    requestInputCity(): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question('Enter City: ', (answer) => {
                resolve(answer);
            });
        });
    }

    requestInputAddress(): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question('Enter Address: ', (answer) => {
                resolve(answer);
            });
        });
    }

    requestInputPostalCode(): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question('Enter Postal code: ', (answer) => {
                resolve(answer);
            });
        });
    }
}