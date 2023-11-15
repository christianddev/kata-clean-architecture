import { Entity } from "./shared/Entity";

import { Email } from "../valueObjects/Email";
import { Name } from "../valueObjects/Name";
import { Password } from "../valueObjects/Password";
import { Address } from "../valueObjects/Address";


interface UserData {
  id: string;
  name: Name;
  email: Email;
  password: Password;
  address: Address;
}

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  address: string;
  postalCode: string;
  city: string;
}

export class User extends Entity<UserData> {
  public readonly name: Name;
  public readonly email: Email;
  public readonly password: Password;
  public readonly address: Address;

  private constructor(props: UserData) {
    super(props.id);
    
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.address = props.address;
  }
  
  public static create(props: UserProps): User {
    try {
      const id = props.id ?? crypto.randomUUID();
      const email = Email.create(props.email);
      const name =  Name.create(props.name);
      const password = Password.create(props.password);
      const address = Address.create(props.address, props.postalCode, props.city);

      return new User({id: id, email, name, password, address});
    } catch (error) {
      throw Error(error);
    }
  }

  public update(props: Partial<Omit<UserData, "id">>): User {
    const updatedData: UserData = {
      id: this.id,
      ...(props.email ? {email: props.email} : {email: this.email}),
      ...(props.name ? {name: props.name} : {name: this.name}),
      ...(props.password ? {password: props.password} : {password: this.password}),
      ...(props.address ? {address: props.address} : {address: this.address}),

    };

    return new User(updatedData);
  }
}