import { StyleSheet, UnistylesRuntime, UnistylesThemes } from 'react-native-unistyles'
import { DEFAULT_CONFIG } from '../consts'
import { GridConfig } from '../types'

type UnistylesTheme = UnistylesThemes[keyof UnistylesThemes]
type FunctionOnly<T> = T extends Function ? T : never
type UnistylesMiniRuntime = Parameters<FunctionOnly<Parameters<typeof StyleSheet.create>[0]>>[1]

type Config = Partial<GridConfig> | ((theme: UnistylesTheme, rt: UnistylesMiniRuntime) => Partial<GridConfig>)

class UnistylesGridBuilder {
    #config = DEFAULT_CONFIG as GridConfig

    init = (config: Config) => {
        const computedConfig = typeof config === 'function'
            // @ts-ignore
            ? config(UnistylesRuntime.getTheme(), UnistylesRuntime.miniRuntime)
            : config

        this.#config = {
            ...DEFAULT_CONFIG,
            ...computedConfig,
        }
    }

    get config() {
        return this.#config
    }
}

export const UnistylesGrid = new UnistylesGridBuilder()
