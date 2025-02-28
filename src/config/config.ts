import { DEFAULT_CONFIG, GridConfig } from '../types'

class UnistylesGridBuilder {
    #config = DEFAULT_CONFIG as GridConfig

    init = (config: Partial<GridConfig>) => {
        this.#config = {
            ...DEFAULT_CONFIG,
            ...config,
        }
    }

    get config() {
        return this.#config
    }
}

export const UnistylesGrid = new UnistylesGridBuilder()
