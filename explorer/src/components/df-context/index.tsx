'use client'
import createCtx from '@/lib/create-ctx'
import { DfResItemType } from '@/explorer-manager/src/type'
import React, { useEffect } from 'react'
import { useRequest } from 'ahooks'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import Bit from '@/components/bit'
import { Space } from 'antd'
import { useReplacePathname } from '@/components/use-replace-pathname'

export const DfContext = createCtx<DfResItemType | null>(null!)

const UpdateDfInfo: React.FC = () => {
  const pathname = usePathname()
  const { replace_pathname } = useReplacePathname()
  const dispatch = DfContext.useDispatch()
  const { data = null } = useRequest(() =>
    axios
      .get<{ data: DfResItemType }>('/path/api/get-df', { params: { path: replace_pathname } })
      .then(({ data }) => data.data),
  )

  useEffect(() => {
    dispatch(data)
  }, [data, dispatch, pathname])

  return null
}

export const DfDisplay: React.FC = () => {
  const store = DfContext.useStore()

  return (
    <Space split="/">
      <Bit>{store?.available}</Bit>
      <Bit>{store?.size}</Bit>
    </Space>
  )
}

export const DfProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <DfContext.ContextProvider value={null}>
      <UpdateDfInfo />
      {children}
    </DfContext.ContextProvider>
  )
}
