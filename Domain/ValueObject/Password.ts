import { ValueObject } from "./shared/ValueObject";
import { validateRegex } from '../Utils/utils';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export interface PasswordProps {
  password: string;
  confirmPassword: string;
}
export class Password extends ValueObject<PasswordProps> {
  private constructor(props: PasswordProps) {
    super(props);
  }

  public static create(password: string, confirmPassword: string): Password {
    const regexpErrors = validateRegex(password, PASSWORD_REGEX);
    if (password !== confirmPassword) {
      throw new Error("passwords do not match");
    } else if(regexpErrors){
      throw new Error("password is not valid");
    } else {
      return new Password({password: password, confirmPassword});
    }
  }

  public get value(): string {
    return this.props.password;
  };
}