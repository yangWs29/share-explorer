'use client'
import React, { useState } from 'react'
import { Button, Modal, Space, Table, Tag } from 'antd'
import { RSSItemType } from '@/rss-parse/src/types'
import { useGetRSSLinkDetail } from '@/app/rss/rss-list/use-get-rss-link-detail'
import DateFormat from '@/components/date-format'
import { DownloadOutlined } from '@ant-design/icons'
import { downloadAction } from '@/app/rss/rss-list/actions'

const RSSReviewList: React.FC<{ item: RSSItemType }> = ({ item }) => {
  const { data, loading } = useGetRSSLinkDetail(item)
  const { download_items } = item

  return (
    <Table
      loading={loading}
      rowKey="title"
      dataSource={data}
      pagination={false}
      scroll={{ y: '60vh' }}
      columns={[
        {
          title: '标题',
          render: (detail) => (
            <a href={detail.link} target="_blank">
              {detail.title}
            </a>
          ),
        },
        {
          title: '状态',
          width: 100,
          render: (detail) => {
            if (download_items?.some((xt) => detail.enclosure.url.includes(xt))) {
              return <Tag color="success">已处理</Tag>
            } else {
              return <Tag>未处理</Tag>
            }
          },
        },
        {
          title: '发布时间',
          width: 200,
          dataIndex: 'pubDate',
          render: (time) => <DateFormat>{new Date(time).getTime()}</DateFormat>,
        },
        {
          width: 50,
          render: (detail) => (
            <Space>
              <Button
                type="text"
                onClick={() => downloadAction(item.key, detail.enclosure.url)}
                icon={<DownloadOutlined />}
              />
            </Space>
          ),
        },
      ]}
    />
  )
}

const RssReview: React.FC<React.PropsWithChildren & { item: RSSItemType }> = ({ children, item }) => {
  const [open, changeOpen] = useState(false)

  return (
    <>
      <span onClick={() => changeOpen(true)}>{children}</span>

      <Modal title="订阅预览" open={open} onCancel={() => changeOpen(false)} width="80%">
        <RSSReviewList item={item} />
      </Modal>
    </>
  )
}

export default RssReview
