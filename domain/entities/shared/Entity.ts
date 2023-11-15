export abstract class Entity<T> {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  public equals(entity?: Entity<T>): boolean {
    if (entity === null || entity === undefined || !(entity instanceof Entity)) {
      return false;
    }
    
    return this.id === entity.id;
  }
}