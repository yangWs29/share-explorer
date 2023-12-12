import React from 'react'
import { readdir } from '@/explorer-manager/src/main.mjs'
import { PathContextProvider } from '@/app/path/context'

const Layout: React.FC<React.PropsWithChildren & { params: { path: string[] } }> = ({
  children,
  params: { path = [] },
}) => {
  const readdirList = readdir(path.join('/'), { only_dir: '0', only_file: '0', has_file_stat: '1' })

  return <PathContextProvider value={readdirList}>{children}</PathContextProvider>
}

export default Layout
