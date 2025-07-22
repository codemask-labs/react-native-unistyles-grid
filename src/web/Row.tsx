import React from 'react'
import { View } from 'react-native'
import { UnistylesGrid } from '../config'
import { ColProps, RowProps, RowStyles } from '../types'
import { createStyles, getIsHidden } from '../utils'
import { Col } from './Col'
import { Debug } from './Debug'
import { COLUMN_GAP_CSS_NAME, ROW_GAP_CSS_VALUE } from './vars'

const isValidCol = (element: unknown): element is React.ReactElement<ColProps> => {
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
    const styles = useStyles()
    const filteredChildren = React.Children.toArray(children)
        .filter((col): col is React.ReactElement<ColProps> => {
            if (!isValidCol(col)) {
                return false
            }

            return !getIsHidden(col.props)
        })

    if (filteredChildren.length === 0) {
        return null
    }

    return (
        <View style={[style, styles.row(props)]}>
            {UnistylesGrid.config.debug && <Debug />}
            {filteredChildren}
        </View>
    )
}

const { useStyles } = createStyles({
    row: (props: RowProps) => {
        const columnGap = props.columnGap ?? UnistylesGrid.config.columnGap

        return {
            [COLUMN_GAP_CSS_NAME]: columnGap,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            rowGap: ROW_GAP_CSS_VALUE,
            position: UnistylesGrid.config.debug ? 'relative' : undefined,
            columnGap,
        }
    },
})
