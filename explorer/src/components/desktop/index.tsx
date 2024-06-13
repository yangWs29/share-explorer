'use client'
import React from 'react'
import Link from 'next/link'
import { Card, Space } from 'antd'
import { QBittorrentIcon } from '@/components/icons/q-bittorrent'
import { FolderOutlined, WifiOutlined } from '@ant-design/icons'
import DateItem from '@/components/desktop/date-item'

const Desktop: React.FC = () => {
  return (
    <Card
      bordered={false}
      style={{ background: 'none', border: 'none' }}
      extra={
        <Space>
          <DateItem />
        </Space>
      }
    >
      <Space direction={'vertical'}>
        {[
          { title: 'explore', href: '/path', icon: <FolderOutlined style={{ fontSize: 32 }} /> },
          {
            title: 'qBittorrent',
            href: '/q-bittorrent',
            icon: <QBittorrentIcon style={{ fontSize: 32 }} />,
          },
          {
            title: 'rss',
            href: '/rss/rss-list',
            icon: <WifiOutlined style={{ fontSize: 32, transform: 'rotate(45deg)' }} />,
          },
        ].map((item) => {
          return (
            <Link href={item.href} key={item.title}>
              <Card styles={{ cover: { paddingTop: '15px' } }} cover={item.icon}>
                <Card.Meta style={{ textAlign: 'center' }} title={item.title} />
              </Card>
            </Link>
          )
        })}
      </Space>
    </Card>
  )
}

export default Desktop
