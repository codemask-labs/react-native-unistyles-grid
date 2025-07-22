import { CreateStyleSheet } from './types'

declare module 'react-native-unistyles' {
    // 2.0
    const createStyleSheet: CreateStyleSheet
    const useStyles: <T>(stylesheet: T) => { styles: T }

    // 3.0
    const StyleSheet: {
        create: CreateStyleSheet
    }
}
