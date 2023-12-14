'use client'
import createCtx from '@/lib/create-ctx'
import React from 'react'

export type DisplayType = 'card' | 'table'

const DisplayTypeContext = createCtx<DisplayType>()

export const useDisplayTypeContext = () => {
  return DisplayTypeContext.useStore()
}

export const useDisplayTypeContextDispatch = () => {
  return DisplayTypeContext.useDispatch()
}

export const DisplayTypeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <DisplayTypeContext.ContextProvider value={'card'}>{children}</DisplayTypeContext.ContextProvider>
}
