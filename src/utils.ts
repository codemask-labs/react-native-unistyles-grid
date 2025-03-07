export const reduceObject = <TObj extends Record<string, any>, TReducer>(
    obj: TObj,
    reducer: (value: TObj[keyof TObj], key: keyof TObj) => TReducer,
) => Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, reducer(value as TObj[keyof TObj], key)])) as { [K in keyof TObj]: TReducer }

export const updateObject = <TObj extends Record<string, any>>(obj: TObj, updater: Partial<TObj>) => {
    const nonEmptyUpdates = Object.fromEntries(Object.entries(updater).filter(([_, value]) => value !== undefined))

    return {
        ...obj,
        ...nonEmptyUpdates,
    } as TObj
}
