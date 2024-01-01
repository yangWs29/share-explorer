'use client'
import React from 'react'
import { Button, Space, Table } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Bit from '@/components/bit'
import DateFormat from '@/components/date-format'
import { useReaddirContext } from '@/app/path/readdir-context'
import Preview from '@/components/preview'
import styled from 'styled-components'
import ActionDropdown from '@/components/action-dropdown'
import naturalCompare from 'natural-compare-lite'

const PreviewItemStyle = styled.div`
  position: relative;
  width: 150px;
`

const TableDisplay: React.FC = () => {
  const pathname = usePathname()
  const readdir = useReaddirContext()

  return (
    <Table
      rowKey={'name'}
      pagination={false}
      columns={[
        {
          title: '文件名',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => naturalCompare(a.name, b.name),
          render: (name, item) => {
            return (
              <Space>
                <PreviewItemStyle>
                  <Preview item={item} />
                </PreviewItemStyle>
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
            return <Bit>{size}</Bit>
          },
        },
        {
          title: '修改时间',
          dataIndex: ['stat', 'mtimeMs'],
          width: '160px',
          sorter: (a, b) => (a?.stat?.mtimeMs ?? 0) - (b?.stat?.mtimeMs ?? 0),
          render: (time) => {
            return <DateFormat>{time}</DateFormat>
          },
        },
        {
          title: '操作',
          width: 100,
          render: (item) => {
            return (
              <ActionDropdown item={item}>
                <Button type="text">操作</Button>
              </ActionDropdown>
            )
          },
        },
      ]}
      dataSource={readdir}
    />
  )
}

export default TableDisplay
