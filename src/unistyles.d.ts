import type { CSSProperties } from 'react'
import type { ViewStyle } from 'react-native'
import type { WithBreakpoint } from './types'

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

declare module 'react-native-unistyles' {
    const StyleSheet: {
        create: CreateStyleSheet
    }
}
