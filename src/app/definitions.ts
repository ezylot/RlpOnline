export function deepFreeze<T>(obj: T, excludedObjects: string[] = []): T {
    let propNames = Object.getOwnPropertyNames(obj);
    for (let name of propNames.filter(n => !excludedObjects.includes(n))) {
        let value = (obj as any)[name];
        if (value && typeof value === "object") {
            deepFreeze(value, excludedObjects);
        }
    }
    return Object.freeze(obj);
}

export type OnlyPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
export type OnlyProperties<T> = Pick<T, OnlyPropertyNames<T>>;
export type Mutable<T> = {
    -readonly [P in keyof T]: T[P] extends Function ? never: T[P];
};
