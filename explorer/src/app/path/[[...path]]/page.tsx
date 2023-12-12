'use client'
import React from 'react'
import { Card } from 'antd'
import CardDisplay from '@/app/path/[[...path]]/card-display'
import TableDisplay from '@/app/path/[[...path]]/tale-display'
import ChangeDisplayType from '@/app/path/[[...path]]/change-display-type'
import { usePathContext } from '@/app/path/context'

const Page: React.FC = () => {
  const { display_type } = usePathContext()

  return <Card extra={<ChangeDisplayType />}>{display_type === 'table' ? <TableDisplay /> : <CardDisplay />}</Card>
}

export default Page
