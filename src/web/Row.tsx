import React from 'react'
import { View } from 'react-native'
import { useStyles } from 'react-native-unistyles'
import { UnistylesGrid } from '../config'
import { RowProps, RowStyles } from '../types'
import { createStyleSheet } from '../utils'
import { Col } from './Col'
import { Debug } from './Debug'
import { COLUMN_GAP_CSS_NAME, ROW_GAP_CSS_VALUE } from './vars'

const isValidCol = (element: any) => {
    if (React.isValidElement(element) && element.type === Col) {
        return
    }

    throw new Error('Invalid child element. Only Col components are allowed.')
}

export const Row: React.FunctionComponent<React.PropsWithChildren<RowProps & RowStyles>> = ({
    children,
    style,
    ...props
}) => {
    const { styles } = useStyles(stylesheet)

    React.Children.toArray(children).forEach(isValidCol)

    return (
        <View style={[style, styles.row(props)]}>
            {UnistylesGrid.config.debug && <Debug />}
            {children}
        </View>
    )
}

const stylesheet = createStyleSheet({
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
