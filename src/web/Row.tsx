import React from 'react'
import { View } from 'react-native'
import { useStyles } from 'react-native-unistyles'
import { UnistylesGrid } from '../config'
import { RowProps } from '../types'
import { createStyleSheet } from '../utils'
import { COLUMN_GAP_CSS_VARIABLE, ROW_GAP_CSS_VARIABLE } from './vars'

export const Row: React.FunctionComponent<React.PropsWithChildren<RowProps>> = ({
    children,
    ...props
}) => {
    const { styles } = useStyles(stylesheet)

    return (
        <View style={styles.row(props)}>
            {children}
        </View>
    )
}

const stylesheet = createStyleSheet({
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
