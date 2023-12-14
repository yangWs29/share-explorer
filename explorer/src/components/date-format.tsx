import React from 'react'
import { Space } from 'antd'

const DateFormat: React.FC<React.PropsWithChildren & { title?: React.ReactNode }> = ({ title, children: time }) => {
  return (
    <Space>
      {title && <span>{title}</span>}
      <span>{time ? new Date(Number(time)).toLocaleString('zh-Hans-CN') : '-'}</span>
    </Space>
  )
}

export default DateFormat
