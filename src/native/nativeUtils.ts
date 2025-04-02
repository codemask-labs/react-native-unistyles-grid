import { COLUMN_COUNT, GAP_COUNT } from '../consts'
import { getClosestBreakpointValue } from '../utils'
import { UnistylesGridContextType } from './context'

const getHorizontalPadding = (context: UnistylesGridContextType) => {
    if (!context.containerStyles) {
        return 0
    }

    switch (typeof context.containerStyles.paddingHorizontal) {
        case 'number':
            return context.containerStyles.paddingHorizontal
        case 'undefined':
            return 0
        default:
            return getClosestBreakpointValue(context.containerStyles.paddingHorizontal) ?? 0
    }
}

const getPadding = (type: 'left' | 'right', context: UnistylesGridContextType) => {
    const padding = type === 'left'
        ? context.containerStyles?.paddingLeft
        : context.containerStyles?.paddingRight

    switch (typeof padding) {
        case 'number':
            return padding
        case 'undefined':
            return getHorizontalPadding(context) / 2
        default:
            return 0
    }
}

export const getContextValues = (context: UnistylesGridContextType) => {
    const paddingLeft = getPadding('left', context)
    const paddingRight = getPadding('right', context)
    const padding = paddingLeft + paddingRight
    const columnGap = typeof context.columnGap === 'number'
        ? context.columnGap
        : getClosestBreakpointValue(context.columnGap) ?? 0
    const parentWidth = context.parentWidth - (padding * 2)
    const colSize = (parentWidth - (columnGap * GAP_COUNT)) / COLUMN_COUNT

    return {
        padding,
        columnGap,
        parentWidth,
        colSize: Math.max(colSize, 0),
    }
}
