import React, { useContext } from 'react'
import { View } from 'react-native'
import { useStyles } from 'react-native-unistyles'
import { UnistylesGrid } from '../config'
import { COLUMN_COUNT } from '../consts'
import { ColProps, OrderValue, RowProps, RowStyles } from '../types'
import { createStyleSheet, getClosestBreakpointValue, updateObject } from '../utils'
import { Col } from './Col'
import { UnistylesGridContext, UnistylesGridContextType } from './context'
import { Debug } from './Debug'

const isValidCol = (element: any): element is React.ReactElement<ColProps> => {
    if (React.isValidElement(element) && element.type === Col) {
        return true
    }

    throw new Error('Invalid child element. Only Col components are allowed.')
}

export const Row: React.FunctionComponent<React.PropsWithChildren<RowProps & RowStyles>> = ({
    children,
    style,
    ...props
}) => {
    const { styles } = useStyles(stylesheet)
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
        <View style={[style, styles.row(newContext)]}>
            <UnistylesGridContext.Provider value={newContext}>
                {UnistylesGrid.config.debug && <Debug />}
                {orderedChildren}
            </UnistylesGridContext.Provider>
        </View>
    )
}

const stylesheet = createStyleSheet({
    row: (context: UnistylesGridContextType) => ({
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: context.rowGap,
        columnGap: context.columnGap,
        position: UnistylesGrid.config.debug ? 'relative' : undefined,
    }),
})
