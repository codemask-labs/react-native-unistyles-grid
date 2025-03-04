import React, { CSSProperties } from 'react'
import { View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { UnistylesGrid } from '../config'
import { COLUMN_GAP_CSS_VARIABLE, ROW_GAP_CSS_VARIABLE } from '../consts'
import { GridConfig, RowProps } from '../types'

export const Row: React.FunctionComponent<React.PropsWithChildren<RowProps>> = ({
    children,
    columnGap,
}) => {
    const { styles } = useStyles(stylesheet)

    return (
        <View style={styles.row({ columnGap })}>
            {children}
        </View>
    )
}

const stylesheet = createStyleSheet({
    row: (config: Partial<GridConfig>) => {
        const columnGap = config.columnGap ?? UnistylesGrid.config.columnGap
        const styles = {
            [COLUMN_GAP_CSS_VARIABLE]: columnGap,
            display: 'flex',
            flexDirection: 'row',
            rowGap: `var(${ROW_GAP_CSS_VARIABLE})`,
            columnGap: columnGap as number,
        } as CSSProperties

        // Cast because unistyles 2.0 doesn't support CSSProperties
        return styles as {}
    },
})
