import React from 'react'
import { StyleSheet } from 'react-native-unistyles'
import { COLUMN_COUNT } from '../consts'
import { View } from '../View'
import { COLUMN_GAP_CSS_VALUE, COLUMN_SIZE_CSS_VALUE } from './vars'

export const Debug = () => {
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

const styles = StyleSheet.create({
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
}, '3')
