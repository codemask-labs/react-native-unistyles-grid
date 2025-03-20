import { COLUMN_COUNT, GAP_COUNT } from '../consts'
import { getClosestBreakpointValue } from '../utils'
import { UnistylesGridContextType } from './context'

export const getContextValues = (context: UnistylesGridContextType) => {
    const padding = typeof context.containerPaddingHorizontal === 'number'
        ? context.containerPaddingHorizontal
        : getClosestBreakpointValue(context.containerPaddingHorizontal) ?? 0
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
