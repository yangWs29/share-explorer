import React from 'react'
import { readdir } from '@/explorer-manager/src/main.mjs'
import { PathContextProvider } from '@/app/path/[[...path]]/context'
import LayoutFooter from '@/app/path/[[...path]]/layout-footer'
import LayoutContent from '@/app/path/[[...path]]/layout-content'

const Layout: React.FC<React.PropsWithChildren & { params: { path: string[] } }> = ({
  children,
  params: { path = [] },
}) => {
  const readdirList = readdir(path.join('/'), { only_dir: '0', only_file: '0', has_file_stat: '1' })

  return (
    <PathContextProvider value={readdirList}>
      <LayoutContent>{children}</LayoutContent>

      <LayoutFooter />
    </PathContextProvider>
  )
}

export default Layout
