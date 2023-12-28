import React from 'react'
import { ReaddirListType } from '@/explorer-manager/src/type'
import { ReaddirProvider } from '@/app/path/readdir-context'
import { CardColumnProvider } from '@/app/path/card-colunm-context'
import { DisplayType, DisplayTypeProvider } from '@/app/path/display-type-context'
import { VideoPathProvider } from '@/components/video-modal/video-path-context'
import { ImgExifProvider } from '@/components/img-exif-modal/img-exif-context'
import { MovePathProvider } from '@/components/move-modal/move-path-context'
import { RenameProvider } from '@/components/rename-modal/rename-context'
import { DfProvider } from '@/components/df-context'
import { UnpackPathProvider } from '@/components/unpack-modal/unpack-path-context'
import { VideoInfoProvider } from '@/components/video-info-modal/video-info-context'
import InnerReaddirSortCookie from '@/components/readdir-sort/inner-cookie'
import { EditFileProvider } from '@/components/edit-file/edit-file-context'
import { cookies } from 'next/headers'
import { card_column_cookie_key, display_type_cookie_key } from '@/app/path/conf'

export const PathContextProvider: React.FC<React.ProviderProps<ReaddirListType>> = ({ value, children }) => {
  return (
    <InnerReaddirSortCookie>
      <ReaddirProvider value={value}>
        <CardColumnProvider value={Number(cookies().get(card_column_cookie_key)?.value)}>
          <DisplayTypeProvider value={cookies().get(display_type_cookie_key)?.value as DisplayType}>
            <VideoPathProvider>
              <ImgExifProvider>
                <MovePathProvider>
                  <RenameProvider>
                    <DfProvider>
                      <UnpackPathProvider>
                        <VideoInfoProvider>
                          <EditFileProvider>{children}</EditFileProvider>
                        </VideoInfoProvider>
                      </UnpackPathProvider>
                    </DfProvider>
                  </RenameProvider>
                </MovePathProvider>
              </ImgExifProvider>
            </VideoPathProvider>
          </DisplayTypeProvider>
        </CardColumnProvider>
      </ReaddirProvider>
    </InnerReaddirSortCookie>
  )
}
