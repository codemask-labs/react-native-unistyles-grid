import React, { useState } from 'react'
import { View } from 'react-native'
import { UnistylesGrid, UnistylesGridContext } from '../config'
import { ContainerProps } from '../types'

export const Container: React.FunctionComponent<React.PropsWithChildren<ContainerProps>> = ({
    children,
    containerPadding,
    rowGap,
}) => {
    const [parentWidth, setParentWidth] = useState(0)

    return (
        <View
            onLayout={event => setParentWidth(event.nativeEvent.layout.width)}
            style={{
                flex: 1,
                padding: containerPadding ?? UnistylesGrid.config.containerPadding,
                rowGap: rowGap ?? UnistylesGrid.config.rowGap,
            }}
        >
            <UnistylesGridContext.Provider
                value={{
                    ...UnistylesGrid.config,
                    rowGap: rowGap ?? UnistylesGrid.config.rowGap,
                    parentWidth,
                }}
            >
                {children}
            </UnistylesGridContext.Provider>
        </View>
    )
}
