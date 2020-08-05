type NonNullableRequired<T> = { [P in keyof T]-?: Exclude<T[P], null> };

export type RequireFields<T, Fields extends keyof T> = NonNullableRequired<
  Pick<T, Fields>
> &
  Omit<T, Fields>;
