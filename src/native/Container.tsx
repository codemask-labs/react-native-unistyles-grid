import React, { useState } from 'react'
import { View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { UnistylesGrid } from '../config'
import { ContainerProps, GridConfig } from '../types'
import { UnistylesGridContext } from './context'

export const Container: React.FunctionComponent<React.PropsWithChildren<ContainerProps>> = ({
    children,
    containerPadding,
    rowGap,
}) => {
    const [parentWidth, setParentWidth] = useState(0)
    const { styles } = useStyles(stylesheet)

    return (
        <View
            onLayout={event => setParentWidth(event.nativeEvent.layout.width)}
            style={styles.container({
                rowGap,
                containerPadding,
            })}
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

const stylesheet = createStyleSheet({
    container: (config: Partial<GridConfig>) => ({
        flex: 1,
        padding: (config.containerPadding ?? UnistylesGrid.config.containerPadding) as number,
        rowGap: (config.rowGap ?? UnistylesGrid.config.rowGap) as number,
    }),
})
