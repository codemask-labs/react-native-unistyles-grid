import React from 'react'
import { View } from 'react-native'
import { useStyles } from 'react-native-unistyles'
import { UnistylesGrid } from '../config'
import { ContainerProps } from '../types'
import { createStyleSheet } from '../utils'
import { ROW_GAP_CSS_VARIABLE } from './vars'

export const Container: React.FunctionComponent<React.PropsWithChildren<ContainerProps>> = ({
    children,
    ...props
}) => {
    const { styles } = useStyles(stylesheet)

    return (
        <View style={styles.container(props)}>
            {children}
        </View>
    )
}

const stylesheet = createStyleSheet({
    container: (props: ContainerProps) => {
        const rowGap = props.rowGap ?? UnistylesGrid.config.rowGap

        return {
            [ROW_GAP_CSS_VARIABLE]: rowGap,
            flex: 1,
            paddingVertical: props.containerPaddingVertical ?? UnistylesGrid.config.containerPaddingVertical,
            paddingHorizontal: props.containerPaddingHorizontal ?? UnistylesGrid.config.containerPaddingHorizontal,
            rowGap,
        }
    },
})
