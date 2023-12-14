'use client'
import createCtx from '@/lib/create-ctx'
import { ReaddirListType } from '@/explorer-manager/src/type'
import React from 'react'

const ReaddirContext = createCtx<ReaddirListType>()

export const useReaddirContext = () => {
  return ReaddirContext.useStore()
}

export const ReaddirProvider: React.FC<React.ProviderProps<ReaddirListType>> = ({ value, children }) => {
  return <ReaddirContext.ContextProvider value={value}>{children}</ReaddirContext.ContextProvider>
}
