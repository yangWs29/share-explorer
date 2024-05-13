'use client'
import React from 'react'
import { useRSSList } from '@/app/rss/rss-list/rss-context'
import { Badge, Button, List, Space } from 'antd'
import { CloseOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { deleteRSSAction } from '@/app/rss/rss-list/actions'
import RSSFormModal from '@/app/rss/rss-list/rss-form-modal'
import RssReview from '@/app/rss/rss-list/rss-review'

const RssList: React.FC = () => {
  const { rss_list, update, loading } = useRSSList()

  return (
    <>
      <List
        loading={loading}
        dataSource={rss_list}
        renderItem={(item) => {
          return (
            <List.Item
              extra={
                <Space>
                  <RssReview item={item}>
                    <Button type="text" title="预览" icon={<EyeOutlined />} />
                  </RssReview>
                  <RSSFormModal trigger={<Button type="text" title="编辑" icon={<EditOutlined />} />} item={item} />
                  <Button
                    type="text"
                    title="删除"
                    icon={<CloseOutlined />}
                    onClick={() => deleteRSSAction(item.key).then(() => update())}
                  />
                </Space>
              }
            >
              <Space>
                <Badge status={item.status === 'normal' ? 'success' : 'error'} />
                {item.name}
              </Space>
            </List.Item>
          )
        }}
      />
    </>
  )
}

export default RssList
