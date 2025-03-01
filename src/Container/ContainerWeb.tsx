import React from 'react'
import { View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { UnistylesGrid } from '../config'
import { ContainerProps, GridConfig } from '../types'
import { ROW_GAP_CSS_VARIABLE } from '../consts'

export const Container: React.FunctionComponent<React.PropsWithChildren<ContainerProps>> = ({
    children,
    containerPadding,
    rowGap,
}) => {
    const { styles } = useStyles(stylesheet)

    return (
        <View
            style={styles.container({
                rowGap,
                containerPadding,
            })}
        >
            {children}
        </View>
    )
}

const stylesheet = createStyleSheet({
    container: (config: Partial<GridConfig>) => {
        const rowGap = config.rowGap ?? UnistylesGrid.config.rowGap

        return {
            [ROW_GAP_CSS_VARIABLE]: String(rowGap),
            flex: 1,
            padding: (config.containerPadding ?? UnistylesGrid.config.containerPadding) as number,
            rowGap: rowGap as number,
        }
    },
})
