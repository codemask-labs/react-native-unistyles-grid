import React from 'react'
import { UnistylesBreakpoints, UnistylesRuntime } from 'react-native-unistyles'
import { Col } from './Col'
import { ColProps } from './types'

export const reduceObject = <TObj extends Record<string, any>, TReducer>(
    obj: TObj,
    reducer: (value: TObj[keyof TObj], key: keyof TObj) => TReducer,
) => Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, reducer(value as TObj[keyof TObj], key)])) as { [K in keyof TObj]: TReducer }

export const isValidCol = (element: any): element is React.ReactElement<ColProps> => {
    const valid = React.isValidElement(element) && element.type === Col

    if (!valid) {
        // Throw error
    }

    return valid
}

export const isBreakpoint = (breakpoint: any): breakpoint is keyof UnistylesBreakpoints => {
    return breakpoint in UnistylesRuntime.breakpoints
}

export const isBreakpointKeyValuePair = <T>(pair: [any, T]): pair is [keyof UnistylesBreakpoints, T] => {
    return isBreakpoint(pair[0])
}
