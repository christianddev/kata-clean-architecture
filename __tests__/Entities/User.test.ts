import { User } from "../../Entities/User";

describe("User", () => {
    it("should create an instance of user", () => {
        const name = "name"
        const email = "email@email.com"
        const password = "Abc123123"

        const user = User.create({name, email, password, confirmPassword: password})

        expect(user).toBeInstanceOf(User)
    })

    it("should return an error", () => {
        const name = "name"
        const email = "invalid-email"
        const password = "Abc123123"

        expect(() => User.create({name, email, password, confirmPassword: password})).toThrow(/error creating user/i)
    })

    // it("should return true if the instances are equal", () => {
    //     const name = "name"
    //     const email = "email@email.com"
    //     const password = "Abc123123"

    //     const instance1 = User.create({name, email, password, confirmPassword: password})
    //     const instance2 = User.create({name, email, password, confirmPassword: password})
    //     const areEqual = instance1.equals(instance2)
    //     expect(areEqual).toBeTruthy()
    // })
  
    // it("should return false if the instances are not equal", () => {
    //     const name = "name"
    //     const email = "email@email.com"
    //     const password = "Abc123123"

    //     const instance1 = User.create({name, email, password, confirmPassword: password})
    //     const instance2 = User.create({name: "otherName", email, password, confirmPassword: password})
    //     const areEqual = instance1.equals(instance2)
    //     expect(areEqual).toBeFalsy()
    // })
});