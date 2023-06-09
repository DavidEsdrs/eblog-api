export type AsBoolean<T> = {
    [P in keyof T]?:
        T[P] extends Date ? boolean :
        (T[P] extends Array<any> ? AsBoolean<T> :
        (T[P] extends object ? AsBoolean<T[P]> : boolean));
};