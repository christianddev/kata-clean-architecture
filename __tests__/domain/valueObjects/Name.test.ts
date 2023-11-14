import { Name } from "../../../domain/valueObjects/Name";

describe("Name", () => {
    it('should throws an error name required', () => {
      const emptyName = '';
  
      expect(() => Name.create(emptyName)).toThrow('name required.');
    });

    it('should creates an instance of Name with valid data', () => {
      const validName = 'valid-name';
      const emailInstance = Name.create(validName);
  
      expect(emailInstance).toBeInstanceOf(Name);
      expect(emailInstance.value).toEqual(validName);
    });

    it('should format the name', () => {
      const validName = ' valid-name ';
      const emailInstance = Name.create(validName);
  
      expect(emailInstance).toBeInstanceOf(Name);
      expect(emailInstance.value).toEqual("valid-name");
    });

    it("should return true if the instances are equal", () => {
      const instance1 = Name.create("Name");
      const instance2 = Name.create(" Name");
      const areEqual = instance1.equals(instance2);
      expect(areEqual).toBe(true);
    })
  
    it("should return false if the instances are not equal", () => {
      const instance1 = Name.create("username");
      const instance2 = Name.create("name");
      const areEqual = instance1.equals(instance2);
      expect(areEqual).toBe(false);
    })
});
