'use client'
import createCtx from '@/lib/create-ctx'
import React from 'react'
import { clearCache, useCookieState } from 'ahooks'

export type SortType = 'asc_name' | 'asc_date' | 'desc_name' | 'desc_date'

export const SortContext = createCtx<SortType>()
export const useSortStore = SortContext.useStore
export const useSortDispatch = () => {
  const [, changeSort] = useCookieState('readdir-sort')
  const dispatch = SortContext.useDispatch()

  return (new_sort: SortType) => {
    changeSort(new_sort)

    clearCache()

    dispatch(new_sort)
  }
}
export const SortProvider: React.FC<React.ProviderProps<SortType>> = ({ value, children }) => {
  return <SortContext.ContextProvider value={value}>{children}</SortContext.ContextProvider>
}
