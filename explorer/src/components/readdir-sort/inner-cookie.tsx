import React from 'react'
import { cookies } from 'next/headers'
import { SortProvider, SortType } from '@/components/readdir-sort/sort-context'

const InnerReaddirSortCookie: React.FC<React.PropsWithChildren> = ({ children }) => {
  const sort = (cookies().get('readdir-sort')?.value || 'asc_name') as SortType

  return <SortProvider value={sort}>{children}</SortProvider>
}

export default InnerReaddirSortCookie
