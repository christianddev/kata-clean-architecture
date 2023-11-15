
export abstract class Entity<T> {
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