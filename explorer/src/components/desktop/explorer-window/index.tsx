import React from 'react'
import { CardColumnProvider } from '@/app/path/card-colunm-context'
import { DisplayTypeProvider } from '@/app/path/display-type-context'
import { VideoPathProvider } from '@/components/video-modal/video-path-context'
import { ImgExifProvider } from '@/components/img-exif-modal/img-exif-context'
import { MovePathProvider } from '@/components/move-modal/move-path-context'
import { RenameProvider } from '@/components/rename-modal/rename-context'
import { DfProvider } from '@/components/df-context'
import { UnpackPathProvider } from '@/components/unpack-modal/unpack-path-context'
import { VideoInfoProvider } from '@/components/video-info-modal/video-info-context'
import { EditFileProvider } from '@/components/edit-file/edit-file-context'
import PreviewGroupProvider from '@/components/preview/proview-group-context'
import DesktopContext from '@/components/desktop/desktop-context'
import { ReaddirProvider } from '@/app/path/readdir-context'
import WindowContent from '@/components/desktop/explorer-window/window-content'

const ExplorerWindow: React.FC<{ window_id: number }> = ({ window_id }) => {
  return (
    <ReaddirProvider value={[]}>
      <CardColumnProvider value={4}>
        <DisplayTypeProvider value={'card'}>
          <VideoPathProvider>
            <ImgExifProvider>
              <MovePathProvider>
                <RenameProvider>
                  <DfProvider>
                    <UnpackPathProvider>
                      <VideoInfoProvider>
                        <EditFileProvider>
                          <PreviewGroupProvider>
                            <DesktopContext>
                              <WindowContent window_id={window_id} />
                            </DesktopContext>
                          </PreviewGroupProvider>
                        </EditFileProvider>
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
  )
}

export default ExplorerWindow
