import React, { useState } from 'react'
import { StyleSheet } from 'react-native-unistyles'
import { UniComponents } from '../components'
import { UnistylesGrid } from '../config'
import { ContainerProps } from '../types'
import { updateObject } from '../utils'
import { UnistylesGridContext, UnistylesGridContextType } from './context'

export const Container: React.FunctionComponent<React.PropsWithChildren<ContainerProps>> = ({
    children,
    ...props
}) => {
    const [parentWidth, setParentWidth] = useState(0)
    const context = updateObject({
        ...UnistylesGrid.config,
        parentWidth,
        containerStyles: props.style,
    }, props)

    return (
        <UniComponents.View
            onLayout={event => setParentWidth(Math.floor(event.nativeEvent.layout.width))}
            style={[styles.container(context), props.style ?? UnistylesGrid.config.containerStyles]}
        >
            <UnistylesGridContext.Provider value={context}>
                {children}
            </UnistylesGridContext.Provider>
        </UniComponents.View>
    )
}

const styles = StyleSheet.create({
    container: (context: UnistylesGridContextType) => ({
        flexGrow: 1,
        rowGap: context.rowGap,
    }),
}, '2')
