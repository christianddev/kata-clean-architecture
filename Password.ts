import { ValueObject } from "./ValueObject";


export interface PasswordProps {
    password: string,
    confirmPassword: string
}
export class Password extends ValueObject<PasswordProps> {
    public readonly value: string;

    constructor(props: PasswordProps) {
        super(props);
    }

    public static create(password: string, confirmPassword: string): Password {
        if (password !== confirmPassword) {
            throw new Error("passwords do not match");
        }
        return new Password({password, confirmPassword});
    }
}