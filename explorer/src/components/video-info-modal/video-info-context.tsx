'use client'
import createCtx from '@/lib/create-ctx'
import React from 'react'
import VideoInfoModal from '@/components/video-info-modal/modal'

export const VideoInfoContext = createCtx<string>()
export const VideoInfoProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <VideoInfoContext.ContextProvider value={''}>
      {children}

      <VideoInfoModal />
    </VideoInfoContext.ContextProvider>
  )
}
