'use client'
import createCtx from '@/lib/create-ctx'
import React from 'react'
import UnpackModal from '@/components/unpack-modal/modal'

export const UnpackPathContext = createCtx<string>()
export const useUnpackPathStore = UnpackPathContext.useStore
export const useUnpackPathDispatch = () => {
  const changeUnpackPath = UnpackPathContext.useDispatch()

  return (path: string) => changeUnpackPath(decodeURIComponent(path))
}
export const UnpackPathProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <UnpackPathContext.ContextProvider value={''}>
      <UnpackModal />
      {children}
    </UnpackPathContext.ContextProvider>
  )
}
