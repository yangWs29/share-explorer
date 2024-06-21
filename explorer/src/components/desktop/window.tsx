'use client'
import React from 'react'
import Link from 'next/link'
import { Card, Space } from 'antd'
import { QBittorrentIcon } from '@/components/icons/q-bittorrent'
import { FolderOutlined, WifiOutlined } from '@ant-design/icons'
import DateItem from '@/components/desktop/date-item'
import Dock from '@/components/desktop/dock'
import { useDockAction } from '@/components/desktop/dock/dock-context'

export const app_list = [
  { title: 'explorer', type: 'window', href: '/path', icon: <FolderOutlined style={{ fontSize: '1em' }} /> },
  {
    title: 'qBittorrent',
    type: 'page',
    href: '/q-bittorrent',
    icon: <QBittorrentIcon style={{ fontSize: '1em' }} />,
  },
  {
    title: 'rss',
    type: 'page',
    href: '/rss/rss-list',
    icon: <WifiOutlined style={{ fontSize: '1em', transform: 'rotate(45deg)' }} />,
  },
]

const Window: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { push } = useDockAction()

  return (
    <Card
      bordered={false}
      style={{
        background: 'none',
        border: 'none',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      styles={{
        body: {
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
        },
      }}
      extra={
        <Space>
          <DateItem />
        </Space>
      }
      actions={[<Dock key={1} />]}
    >
      <div
        style={{
          writingMode: 'vertical-lr',
          flex: 1,
        }}
      >
        {app_list.map((item) => {
          return (
            <Link
              style={{ width: '120px', writingMode: 'horizontal-tb', marginBottom: '10px', marginRight: '10px' }}
              href={item.href}
              key={item.title}
              onClick={(e) => {
                if (item.type === 'window') {
                  e.preventDefault()
                  push(item.title)
                }
              }}
            >
              <Card styles={{ cover: { paddingTop: '15px', fontSize: '32px' } }} cover={item.icon}>
                <Card.Meta style={{ textAlign: 'center' }} title={item.title} />
              </Card>
            </Link>
          )
        })}
      </div>

      {children}
    </Card>
  )
}

export default Window
