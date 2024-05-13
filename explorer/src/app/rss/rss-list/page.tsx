import React from 'react'
import { Card, Space } from 'antd'
import RSSFormModal from '@/app/rss/rss-list/rss-form-modal'
import RssList from '@/app/rss/rss-list/rss-list'

const Page: React.FC = () => {
  return (
    <Card
      title="rss-list"
      extra={
        <Space>
          <RSSFormModal />
        </Space>
      }
    >
      <RssList />
    </Card>
  )
}

export default Page
