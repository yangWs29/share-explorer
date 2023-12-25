'use client'
import createCtx from '@/lib/create-ctx'
import React from 'react'
import EditFileModal from '@/components/edit-file/modal'

export const EditFileContext = createCtx<string>('')

export const EditFileProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <EditFileContext.ContextProvider value={''}>
      {children}
      <EditFileModal />
    </EditFileContext.ContextProvider>
  )
}
