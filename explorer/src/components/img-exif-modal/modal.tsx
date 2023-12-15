'use client'
import React, { useState } from 'react'
import { Card, Descriptions, Drawer } from 'antd'
import { map, isEmpty, isUndefined, isNull } from 'lodash'
import { ImgExifContext } from '@/components/img-exif-modal/img-exif-context'
import ExifReader, { ThumbnailTags } from 'exifreader'
import { useMount } from 'ahooks'
import b64toBlob from 'b64-to-blob'

const filter_map = ['ApplicationNotes']

const Thumbnail: React.FC<{ item?: ThumbnailTags }> = ({ item }) => {
  return (
    item && (
      <picture>
        <img src={URL.createObjectURL(b64toBlob(item.base64, item.type))} alt="" />
      </picture>
    )
  )
}

const ExifItem: React.FC = () => {
  const img_path = ImgExifContext.useStore()
  const [info, changeInfo] = useState<ExifReader.Tags | null>()

  useMount(() => {
    ExifReader.load(window.location.origin + img_path)
      .then((data) => {
        changeInfo(data)
      })
      .catch(() => {
        changeInfo(null)
      })
  })

  return (
    <Card loading={isUndefined(info)}>
      {isNull(info) ? (
        'No Exif data'
      ) : (
        <Descriptions column={1} bordered={true} labelStyle={{ width: '20em', textAlign: 'right' }}>
          {map(info, (item, key) =>
            filter_map.includes(key) ? null : (
              <Descriptions.Item key={key} label={key}>
                {key === 'Thumbnail' ? <Thumbnail item={info?.Thumbnail} /> : item.description}
              </Descriptions.Item>
            ),
          )}
        </Descriptions>
      )}
    </Card>
  )
}

const ImgExifModal: React.FC = () => {
  const img_path = ImgExifContext.useStore()
  const dispatch = ImgExifContext.useDispatch()

  return (
    <Drawer
      title="图片信息"
      placement="right"
      open={!isEmpty(img_path)}
      width={1000}
      onClose={() => dispatch('')}
      footer={false}
      destroyOnClose={true}
    >
      <ExifItem />
    </Drawer>
  )
}

export default ImgExifModal
