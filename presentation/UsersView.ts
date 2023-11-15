import { User } from "../domain/entities/User";

export interface UsersView {
    showWelcomeMessage(): void;
    
    requestInputName(): Promise<string>;
    requestInputEmail(): Promise<string>;
    requestInputPassword(): Promise<string>;
    requestInputCity(): Promise<string>;
    requestInputAddress(): Promise<string>;
    requestInputPostalCode(): Promise<string>;

    showUsers(users: User[]): void;
    showError(message: string): void;
    showSuccess(user: User): void;
}