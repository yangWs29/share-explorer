import React from 'react'
import { ReaddirListType } from '@/explorer-manager/src/type'
import { ReaddirProvider } from '@/app/path/readdir-context'
import { CardColumnProvider } from '@/app/path/card-colunm-context'
import { DisplayTypeProvider } from '@/app/path/display-type-context'
import { VideoPathProvider } from '@/components/video-modal/video-path-context'
import { ImgExifProvider } from '@/components/img-exif-modal/img-exif-context'
import { MovePathProvider } from '@/components/move-modal/move-path-context'
import { RenameProvider } from '@/components/rename-modal/rename-context'
import { DfProvider } from '@/components/df-context'
import { UnpackPathProvider } from '@/components/unpack-modal/unpack-path-context'

export const PathContextProvider: React.FC<React.ProviderProps<ReaddirListType>> = ({ value, children }) => {
  return (
    <>
      <ReaddirProvider value={value}>
        <CardColumnProvider>
          <DisplayTypeProvider>
            <VideoPathProvider>
              <ImgExifProvider>
                <MovePathProvider>
                  <RenameProvider>
                    <DfProvider>
                      <UnpackPathProvider>{children}</UnpackPathProvider>
                    </DfProvider>
                  </RenameProvider>
                </MovePathProvider>
              </ImgExifProvider>
            </VideoPathProvider>
          </DisplayTypeProvider>
        </CardColumnProvider>
      </ReaddirProvider>
    </>
  )
}
