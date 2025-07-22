import React, { useContext } from 'react'
import { View } from 'react-native'
import { COLUMN_COUNT } from '../consts'
import { ColProps, ColStyles } from '../types'
import { createStyles, isDefined, reduceObject } from '../utils'
import { UnistylesGridContext, UnistylesGridContextType } from './context'
import { getContextValues } from './nativeUtils'

export const Col: React.FunctionComponent<React.PropsWithChildren<ColProps & ColStyles>> = ({
    children,
    style,
    ...props
}) => {
    const styles = useStyles()
    const context = useContext(UnistylesGridContext)

    return (
        <View style={[style, styles.col(props, context)]}>
            {children}
        </View>
    )
}

const { useStyles } = createStyles({
    col: (
        props: ColProps,
        context: UnistylesGridContextType,
    ) => {
        const { colSize, columnGap } = getContextValues(context)

        const getSizeInPx = (size: string | number) => {
            if (size === COLUMN_COUNT) {
                return '100%'
            }

            const colCount = typeof size === 'string'
                ? parseInt(size, 10)
                : size
            const width = colCount * colSize
            const gapBetweenColumns = (colCount - 1) * columnGap

            return width + gapBetweenColumns
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
                        return getSizeInPx(sizeValue)
                }
            }),
            flex: Object.keys(props).length > 0
                ? reduceObject(props, prop => {
                    switch (true) {
                        case prop === true:
                        case typeof prop === 'object' && prop.span === true:
                        case typeof prop === 'object' && prop.span === undefined:
                            return 1
                        default:
                            return 0
                    }
                })
                : 1,
            marginLeft: reduceObject(props, prop => {
                if (typeof prop === 'object' && isDefined(prop.offset)) {
                    const size = getSizeInPx(prop.offset)

                    return typeof size === 'number'
                        ? size + columnGap
                        : size
                }

                return undefined
            }),
        }
    },
})
