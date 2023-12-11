import React from 'react'
import { Card } from 'antd'
import Link from 'next/link'

const RootPage: React.FC = () => {
  return (
    <Card title="explorer display">
      <Link href={'/path'}>/path</Link>
    </Card>
  )
}

export default RootPage
