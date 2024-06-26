'use client'
import React from 'react'
import { Table } from 'antd'
import DateFormat from '@/components/date-format'
import Bit from '@/components/bit'
import { useRequest } from 'ahooks'
import { getListTorrentsAction } from '@/app/q-bittorrent/actions'

const TorrentTable: React.FC = () => {
  const { data, loading } = useRequest(() => getListTorrentsAction())

  return (
    <Table
      loading={loading}
      rowKey="hash"
      pagination={false}
      dataSource={data}
      columns={[
        { key: 'name', title: 'name', dataIndex: 'name', width: '30%' },
        { key: 'save_path', title: '保存路径', dataIndex: 'save_path', width: '20%' },
        { key: 'progress', title: '进度', dataIndex: 'progress' },
        { key: 'size', title: '大小', dataIndex: 'size', render: (size) => <Bit>{size}</Bit> },
        { key: 'completed', title: '完成大小', dataIndex: 'completed', render: (size) => <Bit>{size}</Bit> },
        {
          key: 'added_on',
          title: '添加时间',
          dataIndex: 'added_on',
          sorter: (a, b) => a.added_on - b.added_on,
          render: (time) => <DateFormat>{time * 1000}</DateFormat>,
        },
        {
          key: 'completion_on',
          title: '完成时间',
          dataIndex: 'completion_on',
          sorter: (a, b) => a.completion_on - b.completion_on,
          render: (time) => <DateFormat>{time * 1000}</DateFormat>,
        },
      ]}
    />
  )
}

export default TorrentTable
