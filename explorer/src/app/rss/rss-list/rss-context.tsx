'use client'
import { useRequest } from 'ahooks'
import { getRSSListAction } from '@/app/rss/rss-list/actions'

export const useRSSList = () => {
  const { data, runAsync, loading } = useRequest(() => getRSSListAction(), { cacheKey: 'get-rss-list-action' })

  return {
    update: runAsync,
    rss_list: data,
    loading,
  }
}
