import React, { useContext } from 'react'
import { View } from 'react-native'
import { COLUMN_COUNT } from '../consts'
import { createStyles } from '../utils'
import { UnistylesGridContext, UnistylesGridContextType } from './context'
import { getContextValues } from './nativeUtils'

export const Debug = () => {
    const styles = useStyles()
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

const { useStyles } = createStyles({
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
        pointerEvents: 'none',
    }),
    debugItem: (context: UnistylesGridContextType) => {
        const { colSize } = getContextValues(context)

        return {
            width: colSize,
            height: '100%',
            backgroundColor: 'rgba(228, 39, 171, 0.5)',
        }
    },
})
