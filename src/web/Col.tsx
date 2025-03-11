import React from 'react'
import { View } from 'react-native'
import { useStyles } from 'react-native-unistyles'
import { COLUMN_COUNT, GAP_COUNT } from '../consts'
import { ColProps, ColStyles } from '../types'
import { createStyleSheet, getClosestBreakpointValue, reduceObject } from '../utils'
import { COLUMN_GAP_CSS_VARIABLE } from './vars'

export const Col: React.FunctionComponent<React.PropsWithChildren<ColProps & ColStyles>> = ({
    children,
    style,
    ...props
}) => {
    const { styles } = useStyles(stylesheet)
    const breakpointProps = getClosestBreakpointValue(props)
    const isHidden = typeof breakpointProps === 'object' && breakpointProps.hide

    if (isHidden) {
        return null
    }

    return (
        <View style={[style, styles.col(props)]}>
            {children}
        </View>
    )
}

const stylesheet = createStyleSheet({
    col: ((props: ColProps) => {
        const columnGap = `var(${COLUMN_GAP_CSS_VARIABLE})`
        const columnSize = `((100% - (${GAP_COUNT} * ${columnGap})) / ${COLUMN_COUNT})`

        const getSize = (size: number | string) => {
            if (size === COLUMN_COUNT) {
                return '100%'
            }

            const span = typeof size === 'string'
                ? parseInt(size)
                : size ?? 0

            return `((${columnSize} * ${span}) + ${span - 1} * ${columnGap})`
        }

        return {
            width: reduceObject(props, prop => {
                const sizeValue = typeof prop === 'object' ? prop.span : prop

                switch (sizeValue) {
                    case 'auto':
                    case true:
                    case undefined:
                        return 'auto'
                    default:
                        return `calc(${getSize(sizeValue)})`
                }
            }),
            order: reduceObject(props, prop => {
                if (typeof prop !== 'object') {
                    return undefined
                }

                switch (prop.order) {
                    case 'first':
                        return -1
                    case 'last':
                        return COLUMN_COUNT
                    default:
                        return prop.order
                }
            }),
            flex: Object.keys(props).length > 0
                ? reduceObject(props, prop => {
                    switch (true) {
                        case prop === true:
                        case typeof prop === 'object' && prop.span === true:
                        case typeof prop === 'object' && !prop.span:
                            return 1
                        default:
                            return undefined
                    }
                })
                : 1,
            marginLeft: reduceObject(props, prop => {
                if (typeof prop === 'object' && prop.offset) {
                    const size = getSize(prop.offset)

                    return size === '100%'
                        ? size
                        : `calc(${size} + ${columnGap})`
                }

                return undefined
            }),
        }
    }),
})
