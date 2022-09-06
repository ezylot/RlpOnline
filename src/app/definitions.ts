export function deepFreeze<T>(obj: T, excludedObjects: string[] = []) {
    let propNames = Object.getOwnPropertyNames(obj);
    for (let name of propNames.filter(n => !excludedObjects.includes(n))) {
        let value = (obj as any)[name];
        if (value && typeof value === "object") {
            deepFreeze(value, excludedObjects);
        }
    }
    return Object.freeze(obj);
}

export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
