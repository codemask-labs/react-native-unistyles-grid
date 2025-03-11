import React, { useContext } from 'react'
import { View } from 'react-native'
import { useStyles } from 'react-native-unistyles'
import { COLUMN_COUNT, GAP_COUNT } from '../consts'
import { createStyleSheet, getClosestBreakpointValue } from '../utils'
import { UnistylesGridContext, UnistylesGridContextType } from './context'

export const Debug = () => {
    const { styles } = useStyles(stylesheet)
    const context = useContext(UnistylesGridContext)

    return (
        <View style={styles.debugContainer(context)}>
            {Array.from({ length: COLUMN_COUNT }, (_, index) => (
                <View
                    key={index}
                    style={styles.debugItem(context)}
                />
            ))}
        </View>
    )
}

const stylesheet = createStyleSheet({
    debugContainer: (context: UnistylesGridContextType) => ({
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        columnGap: context.columnGap,
        zIndex: 99999,
    }),
    debugItem: (context: UnistylesGridContextType) => {
        const padding = typeof context.containerPaddingHorizontal === 'number'
            ? context.containerPaddingHorizontal
            : getClosestBreakpointValue(context.containerPaddingHorizontal) ?? 0
        const columnGap = typeof context.columnGap === 'number'
            ? context.columnGap
            : getClosestBreakpointValue(context.columnGap) ?? 0
        const parentWidth = context.parentWidth - (padding * 2)
        const columnSize = (parentWidth - (columnGap * GAP_COUNT)) / COLUMN_COUNT

        return {
            width: columnSize,
            height: '100%',
            backgroundColor: 'rgba(228, 39, 171, 0.5)',
        }
    },
})
