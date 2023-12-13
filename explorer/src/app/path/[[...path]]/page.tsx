'use client'
import React from 'react'
import CardDisplay from '@/app/path/[[...path]]/card-display'
import TableDisplay from '@/app/path/[[...path]]/table-display'
import { usePathContext } from '@/app/path/context'

const Page: React.FC = () => {
  const { display_type } = usePathContext()

  return <>{display_type === 'table' ? <TableDisplay /> : <CardDisplay />}</>
}

export default Page
