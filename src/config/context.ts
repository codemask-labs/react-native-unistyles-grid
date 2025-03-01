import React from 'react'
import { DEFAULT_CONFIG } from '../consts'
import { GridConfig } from '../types'

type UnistylesGridContextType = GridConfig & {
    parentWidth: number
}

export const UnistylesGridContext = React.createContext<UnistylesGridContextType>({
    ...DEFAULT_CONFIG,
    parentWidth: 0,
})
