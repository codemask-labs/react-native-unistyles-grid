import React, { useContext } from 'react'
import { View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { UnistylesGridContext } from '../config'
import { ColProps, UniBreakpointValues } from '../types'
import { getClosestBreakpointValue, reduceObject } from '../utils'
import { COLUMN_COUNT, GAP_COUNT } from '../consts'

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
        context: React.ContextType<typeof UnistylesGridContext>,
    ) => {
        const padding = typeof context.containerPadding === 'number'
            ? context.containerPadding
            : getClosestBreakpointValue(context.containerPadding) ?? 0
        const columnGap = typeof context.columnGap === 'number'
            ? context.columnGap
            : getClosestBreakpointValue(context.columnGap) ?? 0
        const parentWidth = context.parentWidth - (padding * 2)
        const colSize = (parentWidth - (columnGap * GAP_COUNT)) / COLUMN_COUNT

        const getSizeInPx = (size: string | number | undefined) => {
            if (size === COLUMN_COUNT) {
                return '100%'
            }

            const colCount = typeof size === 'string'
                ? parseInt(size)
                : size ?? 0
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
                        return 'auto'
                    default:
                        return getSizeInPx(sizeValue)
                }
            }) as unknown as UniBreakpointValues,
            flexGrow: (Object.keys(props).length > 0
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
                : 1) as unknown as UniBreakpointValues,
            marginLeft: reduceObject(props, prop => {
                if (typeof prop === 'object' && prop.offset) {
                    const size = getSizeInPx(prop.offset)

                    return typeof size === 'number'
                        ? size + columnGap
                        : size
                }

                return undefined
            }) as unknown as UniBreakpointValues,
        }
    },
})
