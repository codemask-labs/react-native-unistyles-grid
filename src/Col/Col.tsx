import React, { useContext } from 'react'
import { View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { UnistylesGridContext } from '../config'
import { ColProps, ExtraColProps, UniBreakpointValues } from '../types'
import { reduceObject } from '../utils'

type ExtendedColProps = ColProps & ExtraColProps

export const Col: React.FunctionComponent<React.PropsWithChildren<ColProps>> = props => {
    const { children, ...rest } = props as React.PropsWithChildren<ExtendedColProps>
    const { styles } = useStyles(stylesheet)
    const context = useContext(UnistylesGridContext)

    return (
        <View style={styles.col(rest, context)}>
            {children}
        </View>
    )
}

const stylesheet = createStyleSheet({
    col: ({ isFirst, isLast, ...props }: ExtendedColProps, context: React.ContextType<typeof UnistylesGridContext>) => {
        const getSizeInPx = (size: string | number | undefined) => {
            if (size === 12) {
                return '100%'
            }

            return ((parseInt(size as string) / 12) * (context.parentWidth - (context.containerPadding * 2))) - (context.columnGap / 2)
        }

        return {
            width: reduceObject(props, prop => {
                const sizeValue = typeof prop === 'object' ? prop.span : prop

                switch (sizeValue) {
                    case 'auto':
                    case true:
                        return 'auto'
                    default:
                        return getSizeInPx(sizeValue)
                }
            }) as unknown as UniBreakpointValues,
            flexGrow: (Object.keys(props).length > 0
                ? reduceObject(props, prop => {
                    switch (true) {
                        case prop === true:
                        case typeof prop === 'object' && prop.span === true:
                        case typeof prop === 'object' && !prop.span:
                            return 1
                        default:
                            return 0
                    }
                })
                : 1) as unknown as UniBreakpointValues,
            marginLeft: reduceObject(props, prop => {
                if (typeof prop === 'object' && prop.offset) {
                    return getSizeInPx(prop.offset)
                }

                return undefined
            }) as unknown as UniBreakpointValues,
        }
    },
})
