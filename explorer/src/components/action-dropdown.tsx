'use client'
import React from 'react'
import { Dropdown } from 'antd'
import { ReaddirItemType } from '@/explorer-manager/src/type'
import { InfoOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd/es/menu'
import { ImgExifContext } from '@/components/img-exif-modal/img-exif-context'
import { useReplacePathname } from '@/components/use-replace-pathname'
import { isGif, isImage, isRaw } from '@/components/preview/ext-rxp'

const ActionDropdown: React.FC<React.PropsWithChildren & { item: ReaddirItemType }> = ({ children, item }) => {
  const name = item.name
  const { staticPath } = useReplacePathname()
  const changeImgExif = ImgExifContext.useDispatch()
  const is_show_img_exif = isImage(name) || isRaw(name)
  const preview_path = staticPath(name)

  const menu: MenuProps = {
    items: [],
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
