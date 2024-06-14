import React from 'react'
import { Card, Space } from 'antd'
import ChangeThemeDropdown from '@/components/change-theme/change-theme-dropdown'
import type { Metadata } from 'next'
import LayoutFooter from '@/app/q-bittorrent/layout-footer'

export const metadata: Metadata = {
  title: '从零开始-文件资源管理器-qBittorrent',
  description: '从零开始-文件资源管理器-qBittorrent',
}

const layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Card
        title={<>qBittorrent</>}
        style={{ height: 'calc(100vh - 40px)', display: 'flex', flexDirection: 'column' }}
        styles={{
          body: {
            flex: 1,
            overflow: 'scroll',
            overscrollBehavior: 'contain',
          },
        }}
        extra={
          <Space>
            <ChangeThemeDropdown />
          </Space>
        }
      >
        {children}
      </Card>
      <LayoutFooter />
    </>
  )
}

export default layout
