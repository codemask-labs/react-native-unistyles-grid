import { UnistylesBreakpoints } from 'react-native-unistyles'
import { DEFAULT_CONFIG } from './consts'

type SpanValue = number | 'auto' | true | (string & {})

export type OrderValue = 'first' | 'last' | number

type SizeValue =
    | SpanValue
    | Partial<{
        span: SpanValue
        order: OrderValue
        offset: number
    }>

export type ColProps = Partial<Record<keyof UnistylesBreakpoints, SizeValue>>

export type UniBreakpointValues<T = number> = Record<keyof UnistylesBreakpoints, T>

type WithBreakpoint<T> = T | Partial<Record<keyof UnistylesBreakpoints, T>>

export type ExtraColProps = {
    isFirst: boolean
    isLast: boolean
}

export type RowProps = {
    columnGap?: WithBreakpoint<number>
}

export type ContainerProps = {
    containerPadding?: WithBreakpoint<number>
    rowGap?: WithBreakpoint<number>
}

type SimpleGridConfig = typeof DEFAULT_CONFIG

export type GridConfig = {
    [K in keyof SimpleGridConfig]: WithBreakpoint<SimpleGridConfig[K]>
}

