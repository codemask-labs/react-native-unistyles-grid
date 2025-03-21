import React, { useState } from 'react'
import { View } from 'react-native'
import { useStyles } from 'react-native-unistyles'
import { UnistylesGrid } from '../config'
import { ContainerProps } from '../types'
import { createStyleSheet, updateObject } from '../utils'
import { UnistylesGridContext, UnistylesGridContextType } from './context'

export const Container: React.FunctionComponent<React.PropsWithChildren<ContainerProps>> = ({
    children,
    ...props
}) => {
    const [parentWidth, setParentWidth] = useState(0)
    const { styles } = useStyles(stylesheet)
    const context = updateObject({
        ...UnistylesGrid.config,
        parentWidth,
    }, props)

    return (
        <View
            onLayout={event => setParentWidth(Math.floor(event.nativeEvent.layout.width))}
            style={styles.container(context)}
        >
            <UnistylesGridContext.Provider value={context}>
                {children}
            </UnistylesGridContext.Provider>
        </View>
    )
}

const stylesheet = createStyleSheet({
    container: (context: UnistylesGridContextType) => ({
        flexGrow: 1,
        paddingVertical: context.containerPaddingVertical,
        paddingHorizontal: context.containerPaddingHorizontal,
        rowGap: context.rowGap,
    }),
})
