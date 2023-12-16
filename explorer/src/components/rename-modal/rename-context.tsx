'use client'
import createCtx from '@/lib/create-ctx'
import React from 'react'
import MoveModal from '@/components/rename-modal/modal'
import { parseDirPath } from '@/explorer-manager/src/parse-path.mjs'

export const RenameContext = createCtx<{ path: string; dir_path: string }>()
export const useRenameStore = RenameContext.useStore
export const useRenameDispatch = () => {
  const renameDispatch = RenameContext.useDispatch()
  return (path: string) =>
    renameDispatch(() => {
      const { last, remain } = parseDirPath(decodeURIComponent(path))

      return { path: last, dir_path: remain }
    })
}
export const RenameProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <RenameContext.ContextProvider value={{ path: '', dir_path: '' }}>
      {children}

      <MoveModal />
    </RenameContext.ContextProvider>
  )
}
