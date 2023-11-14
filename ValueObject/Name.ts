import { ValueObject } from "./ValueObject";

interface NameProps {
    value: string;
}

export class Name extends ValueObject<NameProps> {
    public readonly value: string;

    private constructor(props: NameProps) {
        super(props);
        this.value = props.value;
    }

    public static create(name: string): Name {
        if (name.length === 0) {
            throw new Error("name required.");
        } else {
            return new Name({value: this.format(name)});
        }
    }

    private static format(name: string): string {
        return name.trim();
    }
}