import { Email } from "../ValueObject/Email";
import { EntityData } from "./Entity";
import { Name } from "../ValueObject/Name";
import { Password } from "../ValueObject/Password";


interface UserProps {
    name: Name;
    email: Email;
    password: Password;
}

interface UserData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string
}

export class User implements UserProps {
    public readonly name: Name;
    public readonly email: Email;
    public readonly password: Password;

    private constructor(props: UserProps) {
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
    }
    
    public static create(props: UserData): UserProps {
        if (!props.email) {
            throw new Error("email required");
        }
        if (!props.name) {
            throw new Error("name required");
        }
        if (!props.password) {
            throw new Error("email required");
        }
        
        try {            
            const email = Email.create(props.email);
            const name =  Name.create(props.name);
            const password = Password.create(props.password, props.confirmPassword);
    
            return new User({email, name, password});
        } catch (error) {
            throw Error(`error creating user: ${error}` );
        }
    }

    update(): UserProps {
        throw new Error("Method not implemented.");
    }
}