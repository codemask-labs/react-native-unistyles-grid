import React, { useContext } from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { COLUMN_COUNT } from '../consts'
import { ColProps, OrderValue, RowProps } from '../types'
import { updateObject } from '../utils'
import { Col } from './Col'
import { UnistylesGridContext, UnistylesGridContextType } from './context'
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
    const context = useContext(UnistylesGridContext)
    const newContext = updateObject(context, {
        columnGap,
    })

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
        <View style={styles.row(newContext)}>
            <UnistylesGridContext.Provider value={newContext}>
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
    }),
})
