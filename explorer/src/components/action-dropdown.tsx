'use client'
import React from 'react'
import { App, Dropdown } from 'antd'
import { ReaddirItemType } from '@/explorer-manager/src/type'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  InfoOutlined,
  SisternodeOutlined,
} from '@ant-design/icons'
import { MenuProps } from 'antd/es/menu'
import { ImgExifContext } from '@/components/img-exif-modal/img-exif-context'
import { useReplacePathname } from '@/components/use-replace-pathname'
import { isGif, isImage, isRaw, isVideo } from '@/components/preview/ext-rxp'
import { useMovePathDispatch } from '@/components/move-modal/move-path-context'
import { useRenameDispatch } from '@/components/rename-modal/rename-context'
import { useDeleteReaddirItem } from '@/app/path/readdir-context'
import { deleteAction } from '@/app/path/actions'
import FolderSize from '@/components/folder-size'
import { VideoInfoContext } from '@/components/video-info-modal/video-info-context'
import { EditFileContext } from '@/components/edit-file/edit-file-context'
import { usePreviewGroupDispatch } from '@/components/preview/proview-group-context'
import { useVideoPathDispatch } from '@/components/video-modal/video-path-context'
import { useUnpackPathDispatch } from '@/components/unpack-modal/unpack-path-context'

const ActionDropdown: React.FC<React.PropsWithChildren & { item: ReaddirItemType }> = ({ children, item }) => {
  const { modal } = App.useApp()
  const name = item.name
  const { joinSearchPath, staticPath } = useReplacePathname()
  const path = joinSearchPath([name, item.is_directory ? '/' : ''].filter(Boolean).join(''))
  const deleteItemAction = useDeleteReaddirItem()
  const movePathDispatch = useMovePathDispatch()
  const renameDispatch = useRenameDispatch()
  const changeImgExif = ImgExifContext.useDispatch()
  const is_show_img_exif = !isGif(name) && (isImage(name) || isRaw(name))
  const preview_path = staticPath(name)
  const is_show_video_info = isVideo(name)
  const videoInfoDispatch = VideoInfoContext.useDispatch()
  const editFileDispatch = EditFileContext.useDispatch()
  const previewGroupDispatch = usePreviewGroupDispatch()
  const videoPathDispatch = useVideoPathDispatch()
  const unpackPathDispatch = useUnpackPathDispatch()

  const menu: MenuProps = {
    items: [
      {
        icon: <SisternodeOutlined />,
        label: '移动',
        key: 'move',
        onClick: () => {
          movePathDispatch(path)
        },
      },
      {
        icon: <EditOutlined />,
        label: '重命名',
        key: 'rename',
        onClick: () => {
          renameDispatch(path)
        },
      },
      {
        icon: <DeleteOutlined />,
        label: '删除',
        key: 'delete',
        onClick: () => {
          modal.confirm({
            title: `确认删除？`,
            icon: <ExclamationCircleOutlined />,
            content: item.name,
            okText: '删除',
            cancelText: '取消',
            onOk: async () => {
              deleteAction(path).then(() => {
                deleteItemAction(item.name)
              })
            },
          })
        },
      },
      {
        label: '打开方式',
        key: 'open_with',
        children: [
          { label: '文本', key: 'text', onClick: () => editFileDispatch(joinSearchPath(name)) },
          { label: '图片', key: 'image', onClick: () => previewGroupDispatch(name) },
          { label: '视频', key: 'video', onClick: () => videoPathDispatch(staticPath(name)) },
          { label: '7z', key: '7z', onClick: () => unpackPathDispatch(joinSearchPath(name)) },
        ],
      },
    ],
  }

  if (item.is_directory || is_show_img_exif || is_show_video_info) {
    menu.items?.push({
      icon: <InfoOutlined />,
      label: '信息',
      key: 'info',
      onClick: () => {
        if (item.is_directory) {
          modal.info({ title: path, content: <FolderSize path={path} />, width: 500 })
        } else if (is_show_video_info) {
          videoInfoDispatch(joinSearchPath(name))
        } else {
          changeImgExif(preview_path)
        }
      },
    })
  }

  return (
    <Dropdown menu={menu} trigger={['click']} destroyPopupOnHide={true}>
      {children}
    </Dropdown>
  )
}

export default ActionDropdown
