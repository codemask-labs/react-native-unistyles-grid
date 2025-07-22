import React, { useState } from 'react'
import { View } from 'react-native'
import { UnistylesGrid } from '../config'
import { ContainerProps } from '../types'
import { createStyles, updateObject } from '../utils'
import { UnistylesGridContext, UnistylesGridContextType } from './context'

export const Container: React.FunctionComponent<React.PropsWithChildren<ContainerProps>> = ({
    children,
    ...props
}) => {
    const styles = useStyles()
    const [parentWidth, setParentWidth] = useState(UnistylesGrid.mock.parentWidth)
    const context = updateObject({
        ...UnistylesGrid.config,
        parentWidth,
    }, {
        ...props,
        containerStyles: props.style,
    })

    return (
        <View
            onLayout={event => setParentWidth(Math.floor(event.nativeEvent.layout.width))}
            style={[styles.container(context), props.style ?? UnistylesGrid.config.containerStyles]}
        >
            <UnistylesGridContext.Provider value={context}>
                {children}
            </UnistylesGridContext.Provider>
        </View>
    )
}

const { useStyles } = createStyles({
    container: (context: UnistylesGridContextType) => ({
        flexGrow: 1,
        rowGap: context.rowGap,
    }),
})
