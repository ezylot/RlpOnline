export type OnlyPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
export type OnlyProperties<T> = Pick<T, OnlyPropertyNames<T>>;
export type Mutable<T> = {
    -readonly [P in keyof T]: T[P] extends Function ? never: T[P];
};
