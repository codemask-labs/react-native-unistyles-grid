import { CSSProperties } from 'react'
import { ViewStyle } from 'react-native'
import { createStyleSheet as createStyleSheetBase } from 'react-native-unistyles'
import { WithBreakpoint } from './types'

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

type AllStyles = ViewStyle | CSSProperties

type StyleValues = {
    [propName in keyof AllStyles]?: WithBreakpoint<AllStyles[propName]>
}

type GridStyleSheet = Record<string, StyleValues | ((...args: any) => StyleValues)>

type CreateStyleSheet = {
    <S extends GridStyleSheet>(styles: S): {
        [K in keyof S]: S[K] extends (...args: infer A) => any ? (...args: A) => any : any
    }
}

/**
 * Used to reduce type casting
 */
export const createStyleSheet = createStyleSheetBase as unknown as CreateStyleSheet
