export interface IHandler<I, O> {
  handle: (input: I) => Promise<O>;
}
