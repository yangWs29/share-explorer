'use client'
import { useRequest } from 'ahooks'
import { RSSItemType } from '@/rss-parse/src/types'
import { getRSSLinkDetailAction } from '@/app/rss/rss-list/actions'

export const useGetRSSLinkDetail = (item: RSSItemType) => {
  return useRequest(() => getRSSLinkDetailAction(item.key))
}
