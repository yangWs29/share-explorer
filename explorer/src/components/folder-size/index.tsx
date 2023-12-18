'use client'
import React, { useState } from 'react'
import { useRequest } from 'ahooks'
import axios, { AxiosRequestConfig } from 'axios'
import { ResType } from '@/app/path/api/get-folder-size/route'
import Bit from '@/components/bit'
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const getFolderSize = (config: AxiosRequestConfig) => axios.get<ResType>('/path/api/get-folder-size', config)

const useGetFolderSize = (path: string) => {
  const { data: size, loading } = useRequest(() =>
    getFolderSize({ params: { path: path } }).then(({ data }) => {
      return data.data
    }),
  )

  return { size, loading }
}

const FolderSize: React.FC<{ path: string; title?: string | null }> = ({ path, title = '文件夹大小' }) => {
  const { size, loading } = useGetFolderSize(path)

  return <>{loading ? <LoadingOutlined /> : <Bit title={title}>{size}</Bit>}</>
}

export const FolderSizeBtn: React.FC<{ path: string }> = ({ path }) => {
  const [show, changeShow] = useState(false)

  return (
    <>
      {show ? (
        <FolderSize path={path} title={null} />
      ) : (
        <Button icon={<ReloadOutlined />} onClick={() => changeShow(true)} />
      )}
    </>
  )
}

export default FolderSize
