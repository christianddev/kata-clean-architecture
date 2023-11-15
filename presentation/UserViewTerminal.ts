import { UserView } from './UserView';

export class UserViewTerminal implements UserView {
    
    showWelcomeMessage(): void {
        console.log('Welcome to the user manager!');
    }
}