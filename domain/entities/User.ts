import { Entity } from "./shared/Entity";

import { Email } from "../valueObject/Email";
import { Name } from "../valueObject/Name";
import { Password } from "../valueObject/Password";


interface UserData {
  name: Name;
  email: Email;
  password: Password;
  id: string;
}

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export class User extends Entity<UserData> {
  public readonly name: Name;
  public readonly email: Email;
  public readonly password: Password;

  private constructor(props: UserData) {
    super(props.id);
    
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }
  
  public static create(props: UserProps): User {
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
      const password = Password.create(props.password);

      return new User({id: id, email, name, password});
    } catch (error) {
      throw Error(`error creating user: ${error}` );
    }
  }

  public update(props: Partial<Omit<UserData, "id">>): User {
    const updatedData: UserData = {
      id: this.id,
      ...(props.email ? {email: props.email} : {email: this.email}),
      ...(props.name ? {name: props.name} : {name: this.name}),
      ...(props.password ? {password: props.password} : {password: this.password}),
    };

    return new User(updatedData);
  }

  // public toPrimitive(): UserProps {
  //   return {
  //     id: this.id,
  //     email: this.email.value,
  //     password: this.password.value,
  //     name: this.name.value,
  //   }
  // }
}