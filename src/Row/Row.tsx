import React, { useContext } from 'react'
import { View } from 'react-native'
import { UnistylesRuntime, useStyles } from 'react-native-unistyles'
import { UnistylesGridContext } from '../config'
import { ColProps, ExtraColProps, OrderValue, RowProps, UniBreakpointValues } from '../types'
import { isBreakpointKeyValuePair, isValidCol } from '../utils'

export const Row: React.FunctionComponent<React.PropsWithChildren<RowProps>> = ({
    children,
    columnGap,
}) => {
    const { breakpoint } = useStyles()
    const context = useContext(UnistylesGridContext)

    const extractOrderValue = (child: React.ReactElement<ColProps>) => {
        if (!breakpoint) {
            return null
        }

        const breakpoints = UnistylesRuntime.breakpoints as UniBreakpointValues
        const breakpointProps = Object.entries(child.props)
            // Filter out non-breakpoint props
            .filter(isBreakpointKeyValuePair)
            // Sort in descending order
            .sort(([a], [b]) => {
                return breakpoints[b] - breakpoints[a]
            })
        // Get breakpoint prop with highest priority
        const [_, currentBreakpointProp] = breakpointProps.find(
            ([key]) => breakpoints[key] <= breakpoints[breakpoint],
        ) ?? []

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
            style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                rowGap: context.rowGap,
                columnGap: columnGap ?? context.columnGap,
            }}
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
