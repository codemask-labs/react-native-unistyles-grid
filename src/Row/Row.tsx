import React, { useContext } from 'react'
import { View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { UnistylesGridContext } from '../config'
import { ColProps, ExtraColProps, GridConfig, OrderValue, RowProps, UniBreakpointValues } from '../types'
import { getClosestBreakpointValue, isValidCol } from '../utils'

export const Row: React.FunctionComponent<React.PropsWithChildren<RowProps>> = ({
    children,
    columnGap,
}) => {
    const { styles } = useStyles(stylesheet)
    const context = useContext(UnistylesGridContext)

    const extractOrderValue = (child: React.ReactElement<ColProps>) => {
        const currentBreakpointProp = getClosestBreakpointValue(child.props)

        if (typeof currentBreakpointProp === 'object' && 'order' in currentBreakpointProp) {
            return currentBreakpointProp.order ?? null
        }

        return null
    }

    const orderedChildren = React.Children
        .toArray(children)
        .filter(isValidCol)
        .sort((a, b) => {
            const aOrder = extractOrderValue(a)
            const bOrder = extractOrderValue(b)

            if (aOrder === bOrder) {
                return 0
            }

            const getOrderValue = (order: OrderValue | null) => {
                switch (order) {
                    case 'first':
                        return 1
                    case null:
                        return 2
                    case 'last':
                        return 3
                    default:
                        return 0
                }
            }

            const aOrderValue = typeof aOrder === 'number' ? aOrder : getOrderValue(aOrder)
            const bOrderValue = typeof bOrder === 'number' ? bOrder : getOrderValue(bOrder)

            return aOrderValue - bOrderValue
        })
        .map((child, index, arr) => {
            const extraProps = {
                isFirst: index === 0,
                isLast: index === arr.length - 1,
            } satisfies ExtraColProps

            return React.cloneElement(child, { key: index, ...extraProps } as ColProps)
        })

    return (
        <View
            style={styles.row({
                columnGap: columnGap ?? context.columnGap,
            })}
        >
            <UnistylesGridContext.Provider
                value={{
                    ...context,
                    columnGap: columnGap ?? context.columnGap,
                }}
            >
                {orderedChildren}
            </UnistylesGridContext.Provider>
        </View>
    )
}

const stylesheet = createStyleSheet({
    row: (config: Partial<GridConfig>) => ({
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: config.rowGap as number,
        columnGap: config.columnGap as number,
    }),
})
