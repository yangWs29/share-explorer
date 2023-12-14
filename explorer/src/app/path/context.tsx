'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { ReaddirListType } from '@/explorer-manager/src/type'
import { useViewport } from '@/components/viewport/context'
import { useMount, useSessionStorageState } from 'ahooks'

type PathContextType = {
  readdir: ReaddirListType
  display_type: 'card' | 'table'
  changeDisplayType: React.Dispatch<React.SetStateAction<PathContextType['display_type']>>
  column: number
  changeColumn: React.Dispatch<React.SetStateAction<number>>
}

const PathContext = createContext<PathContextType>(null!)

export const usePathContext = () => {
  return useContext(PathContext)
}

export const PathContextProvider: React.FC<React.ProviderProps<ReaddirListType>> = ({ value, children }) => {
  const { width } = useViewport()
  const def_column = Math.ceil(width / 280)
  const [display_type, changeDisplayType] = useState<'card' | 'table'>('card')
  const [column, changeColumn] = useState<number>(def_column)
  const [session_column, changeSessionColumn] = useSessionStorageState('card-column')

  useEffect(() => {
    changeSessionColumn(column)
  }, [column])

  useMount(() => {
    changeColumn(Number(session_column))
  })

  return (
    <PathContext.Provider
      value={{
        readdir: value,
        display_type: display_type,
        changeDisplayType: changeDisplayType,
        column: column || def_column,
        changeColumn: changeColumn,
      }}
    >
      {children}
    </PathContext.Provider>
  )
}
