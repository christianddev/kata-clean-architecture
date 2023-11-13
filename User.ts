import { Email } from "./Email";
import { EntityData } from "./Entity";
import { Name } from "./Name";
import { Password } from "./Password";


interface UserProps {
    name: Name;
    email: Email;
    password: Password;
}

interface data {
    [key: string]: string
}

class User implements EntityData<UserProps>{
    public readonly name: Name;
    public readonly email: Email;
    public readonly password: Password;

    constructor(props: UserProps) {
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
    }
    
    create(props: data): User {
        if (!props.emaiL) {
            throw new Error("email required");
        }
        if (!props.name) {
            throw new Error("name required");
        }
        if (!props.password) {
            throw new Error("email required");
        }
        
        try {            
            const email = Email.create(props.emaiL);
            const name =  Name.create(props.name);
            const password = Password.create(props.password, props.confirmPassword);
    
            return new User({email, name, password});
        } catch (error) {
            throw Error(error);
        }
    }
    update(): UserProps {
        throw new Error("Method not implemented.");
    }
}