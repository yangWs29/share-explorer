'use client'
import createCtx from '@/lib/create-ctx'
import React from 'react'
import MoveModal from '@/components/move-modal/modal'

export const MovePathContext = createCtx<string>()
export const useMovePathStore = MovePathContext.useStore
export const useMovePathDispatch = () => {
  const changeMovePath = MovePathContext.useDispatch()
  return (path: string) => changeMovePath(decodeURIComponent(path))
}
export const MovePathProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <MovePathContext.ContextProvider value={''}>
      {children}
      <MoveModal />
    </MovePathContext.ContextProvider>
  )
}
