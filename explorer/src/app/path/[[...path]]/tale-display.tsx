'use client'
import React from 'react'
import { usePathContext } from '@/app/path/context'
import { Space, Table } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileOutlined, FolderOutlined } from '@ant-design/icons'

const TableDisplay: React.FC = () => {
  const pathname = usePathname()
  const { readdir } = usePathContext()

  return (
    <Table
      rowKey={'name'}
      columns={[
        {
          title: '文件名',
          dataIndex: 'name',
          key: 'name',
          render: (name, item) => {
            return (
              <Space>
                {item.is_directory ? <FolderOutlined /> : <FileOutlined />}
                <Link
                  href={item.is_directory ? `${pathname}/${encodeURIComponent(name)}` : `${pathname}`}
                  prefetch={false}
                >
                  {name}
                </Link>
              </Space>
            )
          },
        },
        {
          title: '大小',
          dataIndex: ['stat', 'size'],
          width: '160px',
          sorter: (a, b) => (a?.stat?.size ?? 0) - (b?.stat?.size ?? 0),
          render: (size) => {
            return size
          },
        },
        {
          title: '修改时间',
          dataIndex: ['stat', 'mtimeMs'],
          width: '160px',
          sorter: (a, b) => (a?.stat?.mtimeMs ?? 0) - (b?.stat?.mtimeMs ?? 0),
          render: (time) => {
            return time
          },
        },
      ]}
      dataSource={readdir}
    />
  )
}

export default TableDisplay
