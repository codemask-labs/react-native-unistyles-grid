import React from 'react'
import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { Col, Container, Row, UnistylesGrid } from 'react-native-unistyles-grid'

UnistylesGrid.init({
    containerPadding: 10,
    rowGap: 10,
    columnGap: 20,
})

export default function App() {
    const { styles } = useStyles(stylesheet)

    return (
        <Container>
            <Row columnGap={100}>
                <Col xs={8}>
                    <View style={styles.item}>
                        <Text>
                            Hello12
                        </Text>
                    </View>
                </Col>
                <Col xs={4}>
                    <View style={styles.item}>
                        <Text>
                            Hello
                        </Text>
                    </View>
                </Col>
            </Row>
            <Row>
                <Col>
                    <View style={styles.item}>
                        <Text>
                            Hello
                        </Text>
                    </View>
                </Col>
                <Col>
                    <View style={styles.item}>
                        <Text>
                            Hello
                        </Text>
                    </View>
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
