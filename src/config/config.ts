import { UnistylesRuntime, UnistylesThemes } from 'react-native-unistyles'
import { DEFAULT_CONFIG } from '../consts'
import { GridConfig } from '../types'

type RemoveFunctionPropertyNames<T> = {
    [K in keyof T as T[K] extends (...args: never) => never ? never : K]: T[K]
}

type UnistylesTheme = UnistylesThemes[keyof UnistylesThemes]
type UnistylesMiniRuntime = Omit<RemoveFunctionPropertyNames<typeof UnistylesRuntime>, 'name' | '__type'>

type Config = Partial<GridConfig> | ((theme: UnistylesTheme, rt: UnistylesMiniRuntime) => Partial<GridConfig>)

class UnistylesGridBuilder {
    #config = DEFAULT_CONFIG as GridConfig

    #mock = {
        parentWidth: 0,
    }

    get mock() {
        return {
            ...this.#mock,
            setParentWidth: this.setParentWidth,
        }
    }

    get config() {
        return this.#config
    }

    init = (config: Config) => {
        const computedConfig = typeof config === 'function'
            // @ts-expect-error - mini runtime is hidden
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            ? config(UnistylesRuntime.getTheme(), UnistylesRuntime.miniRuntime)
            : config

        this.#config = {
            ...DEFAULT_CONFIG,
            ...computedConfig,
        }
    }

    private setParentWidth = (width: number) => {
        this.#mock.parentWidth = width
    }
}

export const UnistylesGrid = new UnistylesGridBuilder()
