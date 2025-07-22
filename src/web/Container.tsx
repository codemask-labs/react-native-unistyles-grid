import React from 'react'
import { View } from 'react-native'
import { UnistylesGrid } from '../config'
import { ContainerProps } from '../types'
import { createStyles } from '../utils'
import { ROW_GAP_CSS_NAME } from './vars'

export const Container: React.FunctionComponent<React.PropsWithChildren<ContainerProps>> = ({
    children,
    ...props
}) => {
    const styles = useStyles()

    return (
        <View style={[styles.container(props), props.style ?? UnistylesGrid.config.containerStyles]}>
            {children}
        </View>
    )
}

const { useStyles } = createStyles({
    container: (props: ContainerProps) => {
        const rowGap = props.rowGap ?? UnistylesGrid.config.rowGap

        return {
            [ROW_GAP_CSS_NAME]: rowGap,
            flex: 1,
            rowGap,
        }
    },
})
