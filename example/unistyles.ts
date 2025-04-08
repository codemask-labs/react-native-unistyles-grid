import { StyleSheet } from 'react-native-unistyles'

export const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1536,
} as const

type AppBreakpoints = typeof breakpoints

declare module 'react-native-unistyles' {
    export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
    breakpoints,
})
