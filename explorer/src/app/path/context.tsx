import React from 'react'
import { ReaddirListType } from '@/explorer-manager/src/type'
import { ReaddirProvider } from '@/app/path/readdir-context'
import { CardColumnProvider } from '@/app/path/card-colunm-context'
import { DisplayTypeProvider } from '@/app/path/display-type-context'
import { VideoPathProvider } from '@/components/video-modal/video-path-context'
import { ImgExifProvider } from '@/components/img-exif-modal/img-exif-context'

export const PathContextProvider: React.FC<React.ProviderProps<ReaddirListType>> = ({ value, children }) => {
  return (
    <>
      <ReaddirProvider value={value}>
        <CardColumnProvider>
          <DisplayTypeProvider>
            <VideoPathProvider>
              <ImgExifProvider>{children}</ImgExifProvider>
            </VideoPathProvider>
          </DisplayTypeProvider>
        </CardColumnProvider>
      </ReaddirProvider>
    </>
  )
}
