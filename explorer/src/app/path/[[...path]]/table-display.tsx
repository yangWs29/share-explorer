'use client'
import React, { useEffect } from 'react'
import { Button, Space, Table } from 'antd'
import Bit from '@/components/bit'
import DateFormat from '@/components/date-format'
import { useReaddirContext, useUpdateReaddirList } from '@/app/path/readdir-context'
import Preview from '@/components/preview'
import styled from 'styled-components'
import ActionDropdown from '@/components/action-dropdown'
import naturalCompare from 'natural-compare-lite'
import { useInlinePathname, useInlineRouter } from '@/components/desktop/inline-path-context'
import { staticPath } from '@/components/use-replace-pathname'

const PreviewItemStyle = styled.div`
  position: relative;
  width: 150px;
`

const TableDisplay: React.FC = () => {
  const { push } = useInlineRouter()
  const { loading, update } = useUpdateReaddirList()
  const readdir_list = useReaddirContext()
  const { pathname, is_inline } = useInlinePathname()

  useEffect(() => {
    is_inline && update()
  }, [pathname])

  return (
    <Table
      loading={loading}
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
                <Button
                  type="text"
                  onClick={() => {
                    item.is_directory ? push(item.file_path) : window.open(staticPath(item.file_path), '_blank')
                  }}
                >
                  {name}
                </Button>
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
      dataSource={readdir_list}
    />
  )
}

export default TableDisplay
