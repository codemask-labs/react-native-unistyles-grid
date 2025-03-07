import { UnistylesBreakpoints, UnistylesRuntime } from 'react-native-unistyles'
import { UniBreakpointValues } from '../types'

export const isBreakpoint = (breakpoint: any): breakpoint is keyof UnistylesBreakpoints => {
    return breakpoint in UnistylesRuntime.breakpoints
}

export const isBreakpointKeyValuePair = <T>(pair: [any, T]): pair is [keyof UnistylesBreakpoints, T] => {
    return isBreakpoint(pair[0])
}

export const getClosestBreakpointValue = <T>(values: Partial<Record<keyof UnistylesBreakpoints, T>>) => {
    const breakpoints = UnistylesRuntime.breakpoints as UniBreakpointValues<number>
    const breakpointValues = Object.entries(values)
        // Filter out non-breakpoint values
        .filter(isBreakpointKeyValuePair)
        // Sort in descending order
        .sort(([a], [b]) => {
            return breakpoints[b] - breakpoints[a]
        })

    // Get breakpoint value with highest priority
    const [_, currentBreakpointValue] = breakpointValues.find(
        ([key]) => UnistylesRuntime.breakpoint && (breakpoints[key] <= breakpoints[UnistylesRuntime.breakpoint]),
    ) ?? []

    return currentBreakpointValue
}
