'use client'
import React from 'react'
import { Card, Skeleton } from 'antd'

const Loading: React.FC = () => {
  return (
    <Card>
      <Skeleton active />
    </Card>
  )
}

export default Loading
