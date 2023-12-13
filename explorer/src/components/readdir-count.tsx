'use client'
import React from 'react'
import { Space } from 'antd'
import { usePathContext } from '@/app/path/context'

const ReaddirCount: React.FC = () => {
  const { readdir } = usePathContext()

  return (
    <Space>
      <span>{readdir.length}</span>
      <span>个项目</span>
    </Space>
  )
}

export default ReaddirCount
