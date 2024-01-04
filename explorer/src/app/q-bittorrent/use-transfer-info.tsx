'use client'
import { useRequest } from 'ahooks'
import { getTransferInfo } from '@/app/q-bittorrent/actions'

export const useGetTransferInfo = () => {
  const { data } = useRequest(() => getTransferInfo(), {
    pollingInterval: 1000,
  })

  return { data }
}
