import { ValueObject } from "./shared/ValueObject";
import { validateRegex } from '../../Utils/utils';

export interface EmailProps {
  value: string
};

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class Email extends ValueObject<EmailProps>{
    
  private constructor(props: EmailProps) {
    super(props);
  }
  
  public static create(email: string): Email{
    const regexpErrors = validateRegex(email, EMAIL_REGEX);

    if (email.length === 0) {
      throw new Error("Email is empty.");
    } else if (regexpErrors) {
      throw new Error("Email is not valid.");
    } else {
      return new Email({value: this.format(email)});
    }
  }

  public get value(): string {
    return this.props.value;
  };

  private static format(email: string): string {
    return email.trim().toLowerCase();
  }
}