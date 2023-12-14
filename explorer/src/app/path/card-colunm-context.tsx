'use client'
import createCtx from '@/lib/create-ctx'
import React, { useEffect, useState } from 'react'
import { useViewport } from '@/components/viewport/context'
import { useMount, useSessionStorageState } from 'ahooks'

const CardColumnContext = createCtx<number>()

export const useCardColumnContext = () => {
  return CardColumnContext.useStore()
}

export const useCardColumnContextDispatch = () => {
  return CardColumnContext.useDispatch()
}

export const CardColumnProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { width } = useViewport()
  const def_column = Math.ceil(width / 280)
  const [column, changeColumn] = useState<number>(def_column)
  const [session_column, changeSessionColumn] = useSessionStorageState('card-column')

  useEffect(() => {
    changeSessionColumn(column)
  }, [column])

  useMount(() => {
    changeColumn(Number(session_column))
  })

  return <CardColumnContext.ContextProvider value={column || def_column}>{children}</CardColumnContext.ContextProvider>
}
