import React from 'react'
import ExplorerBreadcrumb from '@/components/explorer-breadcrumb'
import { Card, Space } from 'antd'
import { TerminalProvider } from '@/components/terminal/terminal-context'
import ShowTerminalBtn from '@/components/terminal/show-terminal-btn'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <TerminalProvider>
      <Card
        bordered={false}
        title={<ExplorerBreadcrumb />}
        extra={
          <Space>
            <ShowTerminalBtn />
          </Space>
        }
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        bodyStyle={{ padding: '16px 0 0 0', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}
      >
        {children}
      </Card>
    </TerminalProvider>
  )
}

export default Layout
