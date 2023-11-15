import { ValueObject } from "./shared/ValueObject";
import { validateRegex } from '../../utils/validations';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export interface PasswordProps {
  password: string;
}
export class Password extends ValueObject<PasswordProps> {
  private constructor(props: PasswordProps) {
    super(props);
  }

  public static create(password: string): Password {
    const regexpErrors = validateRegex(password, PASSWORD_REGEX);

    if(password.length === 0) {
      throw new Error("password is required");
    } else if(regexpErrors){
      throw new Error("password is not valid");
    } else {
      return new Password({ password });
    }
  }

  public get value(): string {
    return this.props.password;
  };
}