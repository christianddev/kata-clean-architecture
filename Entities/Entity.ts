export interface EntityData {
  id: string;
}

export abstract class Entity<T> implements EntityData {
  constructor(public id: string) {
    this.id = id;
  }

  public equals(entity?: Entity<T>): boolean {
    if (entity === null || entity === undefined || !(entity instanceof Entity)) {
      return false;
    }
    
    return this.id === entity.id;
  }
}