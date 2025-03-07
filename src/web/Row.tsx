import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { UnistylesGrid } from '../config'
import { RowProps } from '../types'
import { COLUMN_GAP_CSS_VARIABLE, ROW_GAP_CSS_VARIABLE } from './vars'

export const Row: React.FunctionComponent<React.PropsWithChildren<RowProps>> = ({
    children,
    ...props
}) => {
    return (
        <View style={styles.row(props)}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    row: (props: RowProps) => {
        const columnGap = props.columnGap ?? UnistylesGrid.config.columnGap

        return {
            [COLUMN_GAP_CSS_VARIABLE]: columnGap,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            rowGap: `var(${ROW_GAP_CSS_VARIABLE})`,
            columnGap,
        }
    },
})
