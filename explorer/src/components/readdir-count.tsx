'use client'
import React from 'react'
import { Space } from 'antd'
import { useReaddirContext } from '@/app/path/readdir-context'

const ReaddirCount: React.FC = () => {
  const readdir = useReaddirContext()

  return (
    <Space>
      <span>{readdir.length}</span>
      <span>个项目</span>
    </Space>
  )
}

export default ReaddirCount
