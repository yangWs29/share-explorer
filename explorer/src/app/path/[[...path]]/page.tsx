'use client'
import React from 'react'
import CardDisplay from '@/app/path/[[...path]]/card-display'
import TableDisplay from '@/app/path/[[...path]]/table-display'
import { useDisplayTypeContext } from '@/app/path/display-type-context'

const Page: React.FC = () => {
  const display_type = useDisplayTypeContext()

  return <>{display_type === 'table' ? <TableDisplay /> : <CardDisplay />}</>
}

export default Page
