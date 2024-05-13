'use client'
import { useRequest } from 'ahooks'
import { getSyncMainDataAction, getTransferInfoAction } from '@/app/q-bittorrent/actions'

export const useGetTransferInfo = () => {
  const { data } = useRequest(() => getTransferInfoAction(), {
    pollingInterval: 1000,
  })

  return { data }
}

export const useGetSyncMainData = () => {
  return useRequest(
    () =>
      getSyncMainDataAction().then((data) => {
        return data
      }),
    {
      pollingInterval: 1000,
    },
  )
}
