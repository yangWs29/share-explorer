'use client'
import createCtx from '@/lib/create-ctx'
import React from 'react'
import { useViewport } from '@/components/viewport/context'
import { setCardColumnCookie } from '@/app/path/actions'

const CardColumnContext = createCtx<number>()

export const useCardColumnContext = () => {
  return CardColumnContext.useStore()
}

export const useCardColumnContextDispatch = () => {
  const dispatch = CardColumnContext.useDispatch()

  return (column: number) => {
    dispatch(column)
    setCardColumnCookie(column)
  }
}

export const CardColumnProvider: React.FC<React.ProviderProps<number>> = ({ value, children }) => {
  const { width } = useViewport()
  const column = value || Math.ceil(width / 280)

  return <CardColumnContext.ContextProvider value={column}>{children}</CardColumnContext.ContextProvider>
}
