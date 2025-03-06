import React, { useContext } from 'react'
import { View } from 'react-native'
import { useStyles } from 'react-native-unistyles'
import { COLUMN_COUNT, GAP_COUNT } from '../consts'
import { ColProps } from '../types'
import { createStyleSheet, reduceObject } from '../utils'
import { UnistylesGridContext, UnistylesGridContextType } from './context'
import { getClosestBreakpointValue } from './nativeUtils'

export const Col: React.FunctionComponent<React.PropsWithChildren<ColProps>> = ({ children, ...props }) => {
    const { styles } = useStyles(stylesheet)
    const context = useContext(UnistylesGridContext)

    return (
        <View style={styles.col(props, context)}>
            {children}
        </View>
    )
}

const stylesheet = createStyleSheet({
    col: (
        props: ColProps,
        context: UnistylesGridContextType,
    ) => {
        const padding = typeof context.containerPaddingHorizontal === 'number'
            ? context.containerPaddingHorizontal
            : getClosestBreakpointValue(context.containerPaddingHorizontal) ?? 0
        const columnGap = typeof context.columnGap === 'number'
            ? context.columnGap
            : getClosestBreakpointValue(context.columnGap) ?? 0
        const parentWidth = context.parentWidth - (padding * 2)
        const colSize = (parentWidth - (columnGap * GAP_COUNT)) / COLUMN_COUNT

        const getSizeInPx = (size: string | number) => {
            if (size === COLUMN_COUNT) {
                return '100%'
            }

            const colCount = typeof size === 'string'
                ? parseInt(size)
                : size
            const width = colCount * colSize
            const gapBetweenColumns = (colCount - 1) * columnGap

            return width + gapBetweenColumns
        }

        return {
            width: reduceObject(props, prop => {
                const sizeValue = typeof prop === 'object' ? prop.span : prop

                switch (sizeValue) {
                    case 'auto':
                    case true:
                    case undefined:
                        return 'auto'
                    default:
                        return getSizeInPx(sizeValue)
                }
            }),
            flex: Object.keys(props).length > 0
                ? reduceObject(props, prop => {
                    switch (true) {
                        case prop === true:
                        case typeof prop === 'object' && prop.span === true:
                        case typeof prop === 'object' && !prop.span:
                            return 1
                        default:
                            return 0
                    }
                })
                : 1,
            marginLeft: reduceObject(props, prop => {
                if (typeof prop === 'object' && prop.offset) {
                    const size = getSizeInPx(prop.offset)

                    return typeof size === 'number'
                        ? size + columnGap
                        : size
                }

                return undefined
            }),
        }
    },
})
