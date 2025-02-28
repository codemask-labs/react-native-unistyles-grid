import React from 'react'
import { DEFAULT_CONFIG } from '../types'

export const UnistylesGridContext = React.createContext({
    ...DEFAULT_CONFIG,
    parentWidth: 0,
})
