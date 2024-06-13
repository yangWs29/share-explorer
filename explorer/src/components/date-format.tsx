import React from 'react'
import { Space } from 'antd'

export const format = (time: number) => {
  return new Date(time).toLocaleString('zh-Hans-CN')
}

const DateFormat: React.FC<React.PropsWithChildren & { title?: React.ReactNode }> = ({ title, children: time }) => {
  return (
    <Space>
      {title && <span>{title}</span>}
      <span>{time ? format(Number(time)) : '-'}</span>
    </Space>
  )
}

export default DateFormat
