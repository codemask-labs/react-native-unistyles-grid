import React from 'react'
import { GridConfig } from '../types'
import { DEFAULT_CONFIG } from '../consts'

type UnistylesGridContextType = GridConfig & {
    parentWidth: number
}

export const UnistylesGridContext = React.createContext<UnistylesGridContextType>({
    ...DEFAULT_CONFIG,
    parentWidth: 0,
})
