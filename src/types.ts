import type { CSSProperties } from 'react'
import type { ViewStyle } from 'react-native'
import type { UnistylesBreakpoints } from 'react-native-unistyles'
import type { DEFAULT_CONFIG } from './consts'

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

export type ContainerProps = Partial<Pick<GridConfig, 'rowGap'>> & {
    style?: ContainerStyles
}

type SimpleGridConfig = Omit<typeof DEFAULT_CONFIG, 'debug' | 'containerStyles'>

type AvailableContainerStyles = 'paddingVertical' | 'paddingHorizontal' | 'paddingTop' | 'paddingRight' | 'paddingBottom' | 'paddingLeft'
type ContainerStyles = {
    [S in AvailableContainerStyles]?: WithBreakpoint<number>
}

export type GridConfig =
    & {
        [K in keyof SimpleGridConfig]: WithBreakpoint<SimpleGridConfig[K]>
    }
    & {
        debug?: boolean
        containerStyles?: ContainerStyles
    }

type AllStyles = ViewStyle | CSSProperties

type StyleValues = {
    [propName in keyof AllStyles]?: WithBreakpoint<AllStyles[propName]>
}

export type GridStyleSheet = Record<string, StyleValues | ((...args: any) => StyleValues)>

export type CreateStyleSheet = <S extends GridStyleSheet>(styles: S) => {
    [K in keyof S]: S[K] extends (...args: infer A) => any ? (...args: A) => any : any
}
