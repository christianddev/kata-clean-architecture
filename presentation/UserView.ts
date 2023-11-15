export interface UserView {
    showWelcomeMessage(): void;
    
    showUsers(users: string[]): void;
}