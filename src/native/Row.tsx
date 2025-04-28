import React, { useContext } from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { UnistylesGrid } from '../config'
import { ColProps, OrderValue, RowProps, RowStyles } from '../types'
import { getClosestBreakpointValue, getIsHidden, updateObject } from '../utils'
import { Col } from './Col'
import { UnistylesGridContext, UnistylesGridContextType } from './context'
import { Debug } from './Debug'

const isValidCol = (element: any): element is React.ReactElement<ColProps> => {
    if (React.isValidElement(element as {}) && element.type === Col) {
        return true
    }

    throw new Error('Invalid child element. Only Col components are allowed.')
}

type NotNumber<T> = T extends number ? never : T

export const Row: React.FunctionComponent<React.PropsWithChildren<RowProps & RowStyles>> = ({
    children,
    style,
    ...props
}) => {
    const context = useContext(UnistylesGridContext)
    const newContext = updateObject(context, props)

    const extractOrderValue = (child: React.ReactElement<ColProps>) => {
        const currentBreakpointProp = getClosestBreakpointValue(child.props)

        if (typeof currentBreakpointProp === 'object' && 'order' in currentBreakpointProp) {
            return currentBreakpointProp.order ?? null
        }

        return null
    }

    const orderedChildren = React.Children
        .toArray(children)
        .filter((col): col is React.ReactElement<ColProps> => {
            if (!isValidCol(col)) {
                return false
            }

            return !getIsHidden(col.props) && context.parentWidth > 0
        })
        .sort((a, b) => {
            const aOrder = extractOrderValue(a)
            const bOrder = extractOrderValue(b)

            if (aOrder === bOrder) {
                return 0
            }

            const getOrderValue = (order: NotNumber<OrderValue> | null) => {
                switch (order) {
                    case 'first':
                        return -Infinity
                    case 'last':
                        return Infinity
                    default:
                        return 0
                }
            }

            const aOrderValue = typeof aOrder === 'number' ? aOrder : getOrderValue(aOrder)
            const bOrderValue = typeof bOrder === 'number' ? bOrder : getOrderValue(bOrder)

            if (aOrderValue === bOrderValue) {
                return 0
            }

            return aOrderValue < bOrderValue ? -1 : 1
        })

    if (orderedChildren.length === 0) {
        return null
    }

    return (
        <View style={[style, styles.row(newContext)]}>
            <UnistylesGridContext.Provider value={newContext}>
                {UnistylesGrid.config.debug && <Debug />}
                {orderedChildren}
            </UnistylesGridContext.Provider>
        </View>
    )
}

const styles = StyleSheet.create({
    row: (context: UnistylesGridContextType) => ({
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: context.rowGap,
        columnGap: context.columnGap,
        position: UnistylesGrid.config.debug ? 'relative' : undefined,
    }),
})
