import React, { useState } from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
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
    }, { rowGap: props.rowGap })

    return (
        <View
            onLayout={event => setParentWidth(event.nativeEvent.layout.width)}
            style={styles.container(context)}
        >
            <UnistylesGridContext.Provider value={context}>
                {children}
            </UnistylesGridContext.Provider>
        </View>
    )
}

const styles = StyleSheet.create({
    container: (context: UnistylesGridContextType) => ({
        flex: 1,
        paddingVertical: context.containerPaddingVertical,
        paddingHorizontal: context.containerPaddingHorizontal,
        rowGap: context.rowGap,
    }),
})
