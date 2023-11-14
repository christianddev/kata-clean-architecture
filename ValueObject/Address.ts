import { ValueObject } from "./ValueObject";

export interface AddressProps {
  address: string;
  postalCode: string;
  city: string;
}

export class Address extends ValueObject<AddressProps> {
  public readonly address: string;
  public readonly postalCode: string;
  public readonly city: string;

  private constructor(props: AddressProps) {
    super(props);
    this.address = props.address;
    this.postalCode = props.postalCode;
    this.city = props.city;
  }

  public static create(address: string, postalCode: string, city: string): Address {
    if (!address || !postalCode || !city) {
      throw new Error("Address, postal code, and city are required.");
    }

    return new Address({ address, postalCode, city });
  }

  public get values(): AddressProps {
    return {
      address: this.address,
      postalCode: this.postalCode,
      city: this.city,
    };
  }
}
