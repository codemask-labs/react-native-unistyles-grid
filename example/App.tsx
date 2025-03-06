import React from 'react'
import { Text } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { Col, Container, Row, UnistylesGrid } from 'react-native-unistyles-grid'

UnistylesGrid.init((_, rt) => {
    return {
        rowGap: 10,
        columnGap: 10,
        containerPaddingVertical: Math.max(rt.insets.top, 16),
        containerPaddingHorizontal: 16,
    }
})

export default function App() {
    const { styles } = useStyles(stylesheet)

    return (
        <Container>
            <Row>
                <Col xs={12} md={8}>
                    <Text style={styles.item}>
                        xs=12 md=8
                    </Text>
                </Col>
                <Col xs={6} md={4}>
                    <Text style={styles.item}>
                        xs=6 md=4
                    </Text>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={4}>
                    <Text style={styles.item}>
                        xs=6 md=4
                    </Text>
                </Col>
                <Col xs={6} md={4}>
                    <Text style={styles.item}>
                        xs=6 md=4
                    </Text>
                </Col>
                <Col xs={6} md={4}>
                    <Text style={styles.item}>
                        xs=6 md=4
                    </Text>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <Text style={styles.item}>
                        xs=6
                    </Text>
                </Col>
                <Col xs={6}>
                    <Text style={styles.item}>
                        xs=6
                    </Text>
                </Col>
            </Row>
        </Container>
    )
}

const stylesheet = createStyleSheet({
    item: {
        borderColor: 'black',
        borderWidth: 1,
    },
})
