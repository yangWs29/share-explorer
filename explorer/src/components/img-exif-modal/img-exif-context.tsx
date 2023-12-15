'use client'
import createCtx from '@/lib/create-ctx'
import React from 'react'
import ImgExifModal from '@/components/img-exif-modal/modal'

export const ImgExifContext = createCtx<string>()
export const ImgExifProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ImgExifContext.ContextProvider value={''}>
      {children}
      <ImgExifModal />
    </ImgExifContext.ContextProvider>
  )
}
