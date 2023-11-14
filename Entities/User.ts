import { Email } from "../ValueObject/Email";
import { Entity } from "./shared/Entity";
import { Name } from "../ValueObject/Name";
import { Password } from "../ValueObject/Password";


interface UserProps {
  name: Name;
  email: Email;
  password: Password;
  id: string;
}

interface UserData {
  id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class User extends Entity<UserProps> {
  public readonly name: Name;
  public readonly email: Email;
  public readonly password: Password;

  private constructor(props: UserProps) {
    super(props.id);
    
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }
  
  public static create(props: UserData): User {
    if (!props.email) {
      throw new Error("email required");
    }
    if (!props.name) {
      throw new Error("name required");
    }
    if (!props.password) {
      throw new Error("password required");
    }
    
    try {
      const id = props.id ?? crypto.randomUUID();
      const email = Email.create(props.email);
      const name =  Name.create(props.name);
      const password = Password.create(props.password, props.confirmPassword);

      return new User({id: id, email, name, password});
    } catch (error) {
      throw Error(`error creating user: ${error}` );
    }
  }

  public update(props: Partial<Omit<UserProps, "id">>): User {
    const updatedData: UserProps = {
      id: this.id,
      ...(props.email ? {email: props.email} : {email: this.email}),
      ...(props.name ? {name: props.name} : {name: this.name}),
      ...(props.password ? {password: props.password} : {password: this.password}),
    };

    return new User(updatedData);
  }
}