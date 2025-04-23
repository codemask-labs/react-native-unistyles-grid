import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { COLUMN_COUNT } from '../consts'
import { ColProps, ColStyles } from '../types'
import { reduceObject } from '../utils'
import { COLUMN_GAP_CSS_VALUE, COLUMN_SIZE_CSS_VALUE } from './vars'

export const Col: React.FunctionComponent<React.PropsWithChildren<ColProps & ColStyles>> = ({
    children,
    style,
    ...props
}) => {
    return (
        <View style={[style, styles.col(props)]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    col: ((props: ColProps) => {
        const getSize = (size: number | string) => {
            if (size === COLUMN_COUNT) {
                return '100%'
            }

            const span = typeof size === 'string'
                ? parseInt(size, 10)
                : size

            return `((${COLUMN_SIZE_CSS_VALUE} * ${span}) + ${span - 1} * ${COLUMN_GAP_CSS_VALUE})`
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
                        : `calc(${size} + ${COLUMN_GAP_CSS_VALUE})`
                }

                return undefined
            }),
        }
    }),
})
