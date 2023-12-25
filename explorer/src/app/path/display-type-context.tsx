'use client'
import createCtx from '@/lib/create-ctx'
import React from 'react'
import { setDisplayTypeCookie } from '@/app/path/actions'

export type DisplayType = 'card' | 'table'

const DisplayTypeContext = createCtx<DisplayType>()

export const useDisplayTypeContext = () => {
  return DisplayTypeContext.useStore()
}

export const useDisplayTypeContextDispatch = () => {
  const dispatch = DisplayTypeContext.useDispatch()

  return (display_type: DisplayType) => {
    dispatch(display_type)
    setDisplayTypeCookie(display_type)
  }
}

export const DisplayTypeProvider: React.FC<React.ProviderProps<DisplayType>> = ({ value = 'card', children }) => {
  return <DisplayTypeContext.ContextProvider value={value}>{children}</DisplayTypeContext.ContextProvider>
}
