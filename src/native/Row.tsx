import React, { useContext } from 'react'
import { View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { COLUMN_COUNT } from '../consts'
import { ColProps, GridConfig, OrderValue, RowProps } from '../types'
import { Col } from './Col'
import { UnistylesGridContext } from './context'
import { getClosestBreakpointValue } from './nativeUtils'

const isValidCol = (element: any): element is React.ReactElement<ColProps> => {
    const valid = React.isValidElement(element) && element.type === Col

    if (!valid) {
        throw new Error('Invalid child element. Only Col components are allowed.')
    }

    return valid
}

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
                        return COLUMN_COUNT
                    default:
                        return 0
                }
            }

            const aOrderValue = typeof aOrder === 'number' ? aOrder : getOrderValue(aOrder)
            const bOrderValue = typeof bOrder === 'number' ? bOrder : getOrderValue(bOrder)

            return aOrderValue - bOrderValue
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
