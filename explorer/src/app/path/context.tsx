'use client'
import React, { createContext, useContext, useState } from 'react'
import { ReaddirListType } from '@/explorer-manager/src/type'

type PathContextType = {
  readdir: ReaddirListType
  display_type: 'card' | 'table'
  changeDisplayType: React.Dispatch<React.SetStateAction<PathContextType['display_type']>>
}

const PathContext = createContext<PathContextType>(null!)

export const usePathContext = () => {
  return useContext(PathContext)
}

export const PathContextProvider: React.FC<React.ProviderProps<ReaddirListType>> = ({ value, children }) => {
  const [display_type, changeDisplayType] = useState<'card' | 'table'>('card')

  return (
    <PathContext.Provider value={{ readdir: value, display_type: display_type, changeDisplayType: changeDisplayType }}>
      {children}
    </PathContext.Provider>
  )
}
