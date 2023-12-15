'use client'
import createCtx from '@/lib/create-ctx'
import React from 'react'
import VideoModal from '@/components/video-modal/modal'

export const VideoPathContext = createCtx<string>()
export const useVideoPathStore = VideoPathContext.useStore
export const useVideoPathDispatch = VideoPathContext.useDispatch
export const VideoPathProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <VideoPathContext.ContextProvider value="">
      {children}
      <VideoModal />
    </VideoPathContext.ContextProvider>
  )
}
