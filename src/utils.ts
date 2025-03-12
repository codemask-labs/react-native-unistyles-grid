import { CSSProperties } from 'react'
import { ViewStyle } from 'react-native'
import { createStyleSheet as createStyleSheetBase } from 'react-native-unistyles'
import { UnistylesBreakpoints, UnistylesRuntime } from 'react-native-unistyles'
import { ColProps, UniBreakpointValues, WithBreakpoint } from './types'

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

export const isBreakpoint = (breakpoint: any): breakpoint is keyof UnistylesBreakpoints => {
    return breakpoint in UnistylesRuntime.breakpoints
}

export const isBreakpointKeyValuePair = <T>(pair: [any, T]): pair is [keyof UnistylesBreakpoints, T] => {
    return isBreakpoint(pair[0])
}

export const getClosestBreakpointValue = <T>(values: Partial<Record<keyof UnistylesBreakpoints, T>>) => {
    const breakpoints = UnistylesRuntime.breakpoints as UniBreakpointValues
    const breakpointValues = Object.entries(values)
        // Filter out non-breakpoint values
        .filter(isBreakpointKeyValuePair)
        // Sort in descending order
        .sort(([a], [b]) => {
            return breakpoints[b] - breakpoints[a]
        })
    // Get breakpoint value with highest priority
    const [_, currentBreakpointValue] = breakpointValues.find(
        ([key]) => breakpoints[key] <= breakpoints[UnistylesRuntime.breakpoint],
    ) ?? []

    return currentBreakpointValue
}

export const getIsHidden = (props: ColProps) => {
    const breakpointProps = getClosestBreakpointValue(props)

    if (typeof breakpointProps === 'object') {
        return breakpointProps.hide ?? breakpointProps.span === 0
    }

    return breakpointProps === 0
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
