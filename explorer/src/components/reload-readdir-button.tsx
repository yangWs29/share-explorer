'use client'
import { Button } from 'antd'
import React from 'react'
import { ReloadOutlined } from '@ant-design/icons'
import { useUpdateReaddirList } from '@/app/path/readdir-context'

export const ReloadReaddirButton = () => {
  const { update } = useUpdateReaddirList()

  return <Button icon={<ReloadOutlined />} onClick={update} />
}
