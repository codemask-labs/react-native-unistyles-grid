import { COLUMN_COUNT, GAP_COUNT } from '../consts'

export const COLUMN_GAP_CSS_NAME = '--unistyles-grid-column-gap'

export const COLUMN_GAP_CSS_VALUE = `var(${COLUMN_GAP_CSS_NAME})`

export const ROW_GAP_CSS_NAME = '--unistyles-grid-row-gap'

export const ROW_GAP_CSS_VALUE = `var(${ROW_GAP_CSS_NAME})`

export const COLUMN_SIZE_CSS_VALUE = `calc((100% - (${GAP_COUNT} * ${COLUMN_GAP_CSS_VALUE})) / ${COLUMN_COUNT})`
