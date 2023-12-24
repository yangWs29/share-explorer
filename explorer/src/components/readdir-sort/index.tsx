'use client'
import React from 'react'
import { Button, Dropdown } from 'antd'
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons'
import { useSortDispatch, useSortStore } from '@/components/readdir-sort/sort-context'

const ReaddirSort: React.FC = () => {
  const sort = useSortStore()
  const sortDispatch = useSortDispatch()

  return (
    <Dropdown
      placement="top"
      arrow={true}
      trigger={['hover', 'click']}
      menu={{
        selectedKeys: [sort],
        items: [
          {
            key: 'asc_name',
            icon: <SortAscendingOutlined />,
            onClick: () => {
              sortDispatch('asc_name')
            },
            label: '名称正排',
          },
          {
            key: 'desc_name',
            icon: <SortDescendingOutlined />,
            onClick: () => {
              sortDispatch('desc_name')
            },
            label: '名称倒排',
          },
          {
            key: 'asc_date',
            icon: <SortAscendingOutlined />,
            onClick: () => {
              sortDispatch('asc_date')
            },
            label: '时间正排',
          },
          {
            key: 'desc_date',
            icon: <SortDescendingOutlined />,
            onClick: () => {
              sortDispatch('desc_date')
            },
            label: '时间倒排',
          },
        ],
      }}
    >
      <Button icon={<SortAscendingOutlined />} />
    </Dropdown>
  )
}

export default ReaddirSort
