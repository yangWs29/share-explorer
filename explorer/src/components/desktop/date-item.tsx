'use client'
import React from 'react'
import { Button } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'

const DateItem: React.FC = () => {
  return <Button icon={<CalendarOutlined />} type="text" />
}

export default DateItem
