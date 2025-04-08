import React from 'react'
import { StyleSheet } from 'react-native-unistyles'
import { UnistylesGrid } from '../config'
import { ContainerProps } from '../types'
import { View } from '../View'
import { ROW_GAP_CSS_NAME } from './vars'

export const Container: React.FunctionComponent<React.PropsWithChildren<ContainerProps>> = ({
    children,
    ...props
}) => {
    return (
        <View style={[styles.container(props), props.style ?? UnistylesGrid.config.containerStyles]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: (props: ContainerProps) => {
        const rowGap = props.rowGap ?? UnistylesGrid.config.rowGap

        return {
            [ROW_GAP_CSS_NAME]: rowGap,
            flex: 1,
            rowGap,
        }
    },
}, '2')
