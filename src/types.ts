import { ViewStyle } from 'react-native'
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
        hide: true
    }>

export type ColProps = Partial<UniBreakpointValues<SizeValue>>

export type ColStyles = {
    style?: Pick<ViewStyle, 'justifyContent' | 'height' | 'maxHeight' | 'minHeight' | 'zIndex' | 'alignItems' | 'alignContent'>
}

export type UniBreakpointValues<T = number> = Record<keyof UnistylesBreakpoints | symbol, T>

export type WithBreakpoint<T> = T | Partial<UniBreakpointValues<T>>

export type ExtraColProps = {
    isFirst: boolean
    isLast: boolean
}

export type RowProps = Partial<Pick<GridConfig, 'columnGap'>>

export type RowStyles = {
    style?: Pick<ViewStyle, 'flexGrow' | 'height' | 'maxHeight' | 'minHeight' | 'zIndex' | 'alignItems' | 'alignContent'>
}

export type ContainerProps = Partial<Pick<GridConfig, 'containerPaddingVertical' | 'containerPaddingHorizontal' | 'rowGap'>>

type SimpleGridConfig = Omit<typeof DEFAULT_CONFIG, 'debug'>

export type GridConfig =
    & {
        [K in keyof SimpleGridConfig]: WithBreakpoint<SimpleGridConfig[K]>
    }
    & {
        debug?: boolean
    }
