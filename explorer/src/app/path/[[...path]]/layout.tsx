import React from 'react'
import { readdir } from '@/explorer-manager/src/main.mjs'
import { PathContextProvider } from '@/app/path/context'
import { Card } from 'antd'
import ExplorerBreadcrumb from '@/components/explorer-breadcrumb'

const Layout: React.FC<React.PropsWithChildren & { params: { path: string[] } }> = ({
  children,
  params: { path = [] },
}) => {
  const readdirList = readdir(path.join('/'), { only_dir: '0', only_file: '0', has_file_stat: '1' })

  return (
    <PathContextProvider value={readdirList}>
      <Card title={<ExplorerBreadcrumb />}>{children}</Card>
    </PathContextProvider>
  )
}

export default Layout
