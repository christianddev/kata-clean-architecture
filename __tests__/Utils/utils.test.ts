import { validateRegex } from "../../Utils/utils";

describe("Utils", () => {
    describe("validateRegex", () => {
        it("should return true", () => {
            const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

            const isValidPassword = validateRegex("", PASSWORD_REGEX)

            expect(isValidPassword).toBeTruthy()
        });
        it("should return true", () => {
            const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

            const isValidPassword = validateRegex("Abc123123", PASSWORD_REGEX)

            expect(isValidPassword).toBeFalsy()
        });
    })
});