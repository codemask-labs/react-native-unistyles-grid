import React, { CSSProperties } from 'react'
import { View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { COLUMN_COUNT, COLUMN_GAP_CSS_VARIABLE, GAP_COUNT } from '../consts'
import { ColProps } from '../types'
import { reduceObject } from '../utils'

export const Col: React.FunctionComponent<React.PropsWithChildren<ColProps>> = ({ children, ...props }) => {
    const { styles } = useStyles(stylesheet)

    return (
        <View style={styles.col(props)}>
            {children}
        </View>
    )
}

const stylesheet = createStyleSheet({
    col: ((props: ColProps) => {
        const columnGap = `var(${COLUMN_GAP_CSS_VARIABLE})`
        const colSize = `((100% - (${columnGap} * ${GAP_COUNT} * 1px)) / 12)`

        const getSize = (size: number | string) => {
            if (size === COLUMN_COUNT) {
                return '100%'
            }

            const colCount = typeof size === 'string'
                ? parseInt(size)
                : size ?? 0

            return `(${colCount} * ${colSize} + (${colCount - 1} * ${columnGap} * 1px))`
        }

        const styles = {
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
            }) as number,
            order: reduceObject(props, prop => {
                return typeof prop === 'object' && prop.order
                    ? prop.order
                    : undefined
            }) as number,
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
                : 1) as number,
            marginLeft: reduceObject(props, prop => {
                if (typeof prop === 'object' && prop.offset) {
                    const size = getSize(prop.offset)

                    return size === '100%'
                        ? size
                        : `calc(${size} + ${columnGap} * 1px)`
                }

                return undefined
            }) as number,
        } satisfies CSSProperties

        // Cast because unistyles 2.0 doesn't support CSSProperties
        return styles as {}
    }),
})
