import type { View as NativeView } from 'react-native'
// @ts-ignore
import { View as UniView } from 'react-native-unistyles/components/native/View'

export class View extends (UniView as typeof NativeView) {}
