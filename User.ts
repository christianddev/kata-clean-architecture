import { Email } from "./Email";
import { EntityData } from "./Entity";
import { Name } from "./Name";
import { Password } from "./Password";


interface UserProps {
    name: Name;
    emaiL: Email;
    password: Password;
}

class User implements EntityData<UserProps>{
    public name: Name;
    public emaiL: Email;
    public password: Password;

    constructor(props: UserProps) {
        this.name = props.name;
        this.emaiL = props.emaiL;
        this.password = props.password;
    }
    
    create(props: UserProps): User {
        if (!props.emaiL.value) {
            throw new Error("email required");
        }
        if (!props.name.value) {
            throw new Error("name required");
        }
        if (!props.password.value) {
            throw new Error("email required");
        }

        return new User(props);
    }
    update(): UserProps {
        throw new Error("Method not implemented.");
    }
}