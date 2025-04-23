import { UnistylesBreakpoints, UnistylesRuntime } from 'react-native-unistyles'
import { ColProps, UniBreakpointValues } from './types'

export const reduceObject = <TObj extends Record<string, unknown>, TReducer>(
    obj: TObj,
    reducer: (value: TObj[keyof TObj], key: keyof TObj) => TReducer,
) => Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, reducer(value as TObj[keyof TObj], key)])) as { [K in keyof TObj]: TReducer }

export const updateObject = <TObj extends Record<string, unknown>>(obj: TObj, updater: Partial<TObj>) => {
    const nonEmptyUpdates = Object.fromEntries(Object.entries(updater).filter(([_, value]) => value !== undefined))

    return {
        ...obj,
        ...nonEmptyUpdates,
    } as TObj
}

export const isBreakpoint = (breakpoint: unknown): breakpoint is keyof UnistylesBreakpoints => {
    return String(breakpoint) in UnistylesRuntime.breakpoints
}

export const isBreakpointKeyValuePair = <T>(pair: [unknown, T]): pair is [keyof UnistylesBreakpoints, T] => {
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
        ([key]) => isDefined(UnistylesRuntime.breakpoint) && breakpoints[key] <= breakpoints[UnistylesRuntime.breakpoint],
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

export const isDefined = <T>(value: T): value is NonNullable<T> => value !== undefined && value !== null
