'use client'
import naturalCompare from 'natural-compare-lite'
import { ReaddirItemType } from '@/explorer-manager/src/type'
import createCtx from '@/lib/create-ctx'
import React from 'react'

export type SortAction = (a: ReaddirItemType, b: ReaddirItemType) => number
export const nameAscSort: SortAction = (a, b) => naturalCompare(a.name, b.name)
export const dateAscSort: SortAction = (a, b) => (a?.stat?.mtimeMs || 0) - (b?.stat?.mtimeMs || 0)
export const nameDescSort: SortAction = (a, b) => naturalCompare(b.name, a.name)
export const dateDescSort: SortAction = (a, b) => (b?.stat?.mtimeMs || 0) - (a?.stat?.mtimeMs || 0)
export const sortMap = {
  asc_name: nameAscSort,
  asc_date: dateAscSort,
  desc_name: nameDescSort,
  desc_date: dateDescSort,
}

export const SortContext = createCtx<'asc_name' | 'asc_date' | 'desc_name' | 'desc_date'>()
export const useSortStore = SortContext.useStore
export const useSortDispatch = SortContext.useDispatch
export const SortProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <SortContext.ContextProvider value="asc_name">{children}</SortContext.ContextProvider>
}
