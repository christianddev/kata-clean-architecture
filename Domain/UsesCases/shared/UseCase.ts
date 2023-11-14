export default  interface UseCase<T> {
    run(props: T): Promise<void> 
}
