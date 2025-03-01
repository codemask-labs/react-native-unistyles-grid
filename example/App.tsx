import React from 'react'
import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { Col, Container, Row, UnistylesGrid } from 'react-native-unistyles-grid'

UnistylesGrid.init({
    rowGap: 10,
    // columnGap: 10,
    // containerPadding: 10,
})

export default function App() {
    const { styles } = useStyles(stylesheet)

    return (
        <Container>
            <Row>
                <Col xs={{ span: 4 }}>
                    <View style={styles.item}>
                        <Text>
                            Hello
                        </Text>
                    </View>
                </Col>
            </Row>
            <Row>
                <Col xs={{ order: 'last' }}>
                    <View style={styles.item}>
                        <Text>
                            Hello1
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
