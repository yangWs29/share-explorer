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
import { isGif, isImage, isRaw } from '@/components/preview/ext-rxp'
import { useMovePathDispatch } from '@/components/move-modal/move-path-context'
import { useRenameDispatch } from '@/components/rename-modal/rename-context'
import { useDeleteReaddirItem } from '@/app/path/readdir-context'

import { deleteAction } from '@/app/path/actions'

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
    ],
  }

  if (is_show_img_exif) {
    menu.items?.push({
      icon: <InfoOutlined />,
      label: '信息',
      key: 'info',
      onClick: () => {
        changeImgExif(preview_path)
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
