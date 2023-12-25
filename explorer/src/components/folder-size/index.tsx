'use client'
import React, { useState } from 'react'
import { useRequest } from 'ahooks'
import Bit from '@/components/bit'
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { getFolderSizeAction } from '@/components/folder-size/action'

const useGetFolderSize = (path: string) => {
  const { data: size, loading } = useRequest(() => getFolderSizeAction(path))

  return { size, loading }
}

const FolderSize: React.FC<{ path: string; title?: string | null }> = ({ path, title = '文件夹大小' }) => {
  const { size, loading } = useGetFolderSize(path)

  return <>{loading ? <LoadingOutlined /> : <Bit title={title}>{Number(size)}</Bit>}</>
}

export const FolderSizeBtn: React.FC<{ path: string }> = ({ path }) => {
  const [show, changeShow] = useState(false)

  return (
    <>
      {show ? (
        <FolderSize path={path} title={null} />
      ) : (
        <Button type="text" icon={<ReloadOutlined />} onClick={() => changeShow(true)} />
      )}
    </>
  )
}

export default FolderSize
