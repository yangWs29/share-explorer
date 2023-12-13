import React from 'react'
import ExplorerBreadcrumb from '@/components/explorer-breadcrumb'
import { Card } from 'antd'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Card
      bordered={false}
      title={<ExplorerBreadcrumb />}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      bodyStyle={{ padding: '16px 0 0 0', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}
    >
      {children}
    </Card>
  )
}

export default Layout
