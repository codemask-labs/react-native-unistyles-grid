import React from 'react'
import { View } from 'react-native'
import { COLUMN_COUNT } from '../consts'
import { createStyles } from '../utils'
import { COLUMN_GAP_CSS_VALUE, COLUMN_SIZE_CSS_VALUE } from './vars'

export const Debug = () => {
    const styles = useStyles()

    return (
        <View style={styles.debugContainer}>
            {Array.from({ length: COLUMN_COUNT }, (_, index) => (
                <View
                    key={index}
                    style={styles.debugItem}
                />
            ))}
        </View>
    )
}

const { useStyles } = createStyles({
    debugContainer: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        columnGap: COLUMN_GAP_CSS_VALUE,
        zIndex: 99999,
        pointerEvents: 'none',
    },
    debugItem: {
        width: COLUMN_SIZE_CSS_VALUE,
        height: '100%',
        backgroundColor: 'rgba(228, 39, 171, 0.5)',
    },
})
