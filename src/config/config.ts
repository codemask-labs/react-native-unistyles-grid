import { DEFAULT_CONFIG, GridConfid } from '../types'

class GridConfig {
    #config = DEFAULT_CONFIG

    init = (config: Partial<GridConfid>) => {
        this.#config = {
            ...DEFAULT_CONFIG,
            ...config,
        }
    }

    get config() {
        return this.#config
    }
}

export const UnistylesGrid = new GridConfig()
