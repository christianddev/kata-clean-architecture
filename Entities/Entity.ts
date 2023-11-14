// export abstract class Entity<T> {
//   public create<I>(a:I): T
// }

export interface EntityData<T> {
    create(): T,
    update(): T, // TODO: implement another interface for update
}