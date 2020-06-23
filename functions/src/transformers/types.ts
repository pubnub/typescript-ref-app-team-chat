export type Transformer<T> = (message: T) => Promise<T> | T;
