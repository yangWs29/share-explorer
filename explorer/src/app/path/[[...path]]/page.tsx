'use client'
import React from 'react'
import CardDisplay from '@/app/path/[[...path]]/card-display'
import TableDisplay from '@/app/path/[[...path]]/table-display'
import { useDisplayTypeContext } from '@/app/path/display-type-context'
import PreviewGroupProvider from '@/components/preview/proview-group-context'

const Page: React.FC = () => {
  const display_type = useDisplayTypeContext()

  return <PreviewGroupProvider>{display_type === 'table' ? <TableDisplay /> : <CardDisplay />}</PreviewGroupProvider>
}

export default Page
