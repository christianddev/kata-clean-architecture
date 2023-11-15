import { UserView } from './UserView';

export class UserViewTerminal implements UserView {
    
    showWelcomeMessage(): void {
        console.log('Welcome to the user manager!');
    }

    showUsers(users: string[]): void {
        console.log('Users:');
        users.forEach(user => console.log(user));
    }

}