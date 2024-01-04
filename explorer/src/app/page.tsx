import React from 'react'
import { Card, Space } from 'antd'
import Link from 'next/link'

const RootPage: React.FC = () => {
  return (
    <Card title="explorer display">
      <Space direction="vertical">
        <Link href={'/path'}>/path</Link>
        <Link href={'/q-bittorrent'}>/qBittorrent</Link>
      </Space>
    </Card>
  )
}

export default RootPage
