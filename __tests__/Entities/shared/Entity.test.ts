import { Entity, EntityData } from "../../../Entities/shared/Entity";

class SampleEntity extends Entity<any> {
  constructor(id: string) {
    super(id);
  }
}

describe('Entity Class tests', () => {
  const entityId = '123';

  it('should create an instance of Entity with a valid ID', () => {
    const entityInstance = new SampleEntity(entityId);

    expect(entityInstance).toBeInstanceOf(SampleEntity);
    expect(entityInstance.id).toEqual(entityId);
  });

  it('2 entities should be equals with the same ID', () => {
    const entity1 = new SampleEntity(entityId);
    const entity2 = new SampleEntity(entityId);

    expect(entity1.equals(entity2)).toBe(true);
  });

  it('2 entities should not be equals with different IDs', () => {
    const entity1 = new SampleEntity(entityId);
    const entity2 = new SampleEntity('456');

    expect(entity1.equals(entity2)).toBe(false);
  });

  it('equals method should return false for non-entity objects', () => {
    const entity1 = new SampleEntity(entityId);
    const nonEntityObject: EntityData = { id: entityId };

    expect(entity1.equals(nonEntityObject as any)).toBe(false);
  });

  it('equals method should return false for null or undefined', () => {
    const entity1 = new SampleEntity(entityId);

    expect(entity1.equals(null as any)).toBe(false);
    expect(entity1.equals(undefined)).toBe(false);
  });
});