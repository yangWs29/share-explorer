'use client'
import React from 'react'
import { Button, Card, Descriptions, Drawer, Space, Tabs } from 'antd'
import { map, isEmpty, isObject } from 'lodash'
import { useRequest, useUpdateEffect } from 'ahooks'
import { VideoInfoContext } from '@/components/video-info-modal/video-info-context'
import { createVideoPreviewAction, getVideoInfoAction } from '@/components/video-info-modal/action'
import { useFormStatus } from 'react-dom'
import { useUpdateReaddirList } from '@/app/path/readdir-context'

const VideoInfoItem: React.FC = () => {
  const video_path = VideoInfoContext.useStore()
  const { data, loading } = useRequest(() => getVideoInfoAction(video_path))

  return (
    <Card loading={loading}>
      <Tabs
        items={data?.streams.map((item) => {
          return {
            key: [item.codec_type, item.index].join('-'),
            label: (
              <Space>
                {item.codec_type}
                {item.index > 0 ? item.index : ''}
              </Space>
            ),
            children: (
              <>
                <Descriptions
                  column={1}
                  labelStyle={{ width: '15em', textAlign: 'right' }}
                  style={{ maxHeight: '85vh', overflow: 'scroll', overscrollBehavior: 'contain' }}
                >
                  {map(item, (value, key) => (
                    <Descriptions.Item key={key} label={key}>
                      {isObject(value) ? <pre>{JSON.stringify(value, null, 2)}</pre> : value?.toString()}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </>
            ),
          }
        })}
      />
    </Card>
  )
}

const CreatePreviewBtn: React.FC = () => {
  const { pending } = useFormStatus()
  const { update } = useUpdateReaddirList()

  useUpdateEffect(() => {
    if (!pending) {
      setTimeout(() => {
        update()
      }, 1000)
    }
  }, [pending])

  return (
    <Button loading={pending} htmlType="submit">
      创建预览图
    </Button>
  )
}

const VideoInfoModal: React.FC = () => {
  const video_path = VideoInfoContext.useStore()
  const dispatch = VideoInfoContext.useDispatch()

  return (
    <Drawer
      title="视频信息"
      placement="right"
      open={!isEmpty(video_path)}
      width={1000}
      onClose={() => dispatch('')}
      footer={false}
      destroyOnClose={true}
      extra={
        <form action={() => createVideoPreviewAction(video_path)}>
          <CreatePreviewBtn />
        </form>
      }
    >
      <VideoInfoItem />
    </Drawer>
  )
}

export default VideoInfoModal
