import { UnistylesBreakpoints } from 'react-native-unistyles'

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

export type ExtraColProps = {
    isFirst: boolean
    isLast: boolean
}

export type RowProps = {
    columnGap?: number
}

export type ContainerProps = {
    containerPadding?: number
    rowGap?: number
}

export type GridConfid = typeof DEFAULT_CONFIG

export const DEFAULT_CONFIG = {
    rowGap: 0,
    columnGap: 0,
    containerPadding: 0,
}
