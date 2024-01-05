'use client'
import { useRequest } from 'ahooks'
import { getTransferInfoAction } from '@/app/q-bittorrent/actions'

export const useGetTransferInfo = () => {
  const { data } = useRequest(() => getTransferInfoAction(), {
    pollingInterval: 1000,
  })

  return { data }
}
