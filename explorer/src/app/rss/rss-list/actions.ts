'use server'
import { addUrlsTorrent, client } from '@/q-bittorrent/src/main.mjs'
import { TorrentCategories } from '@/q-bittorrent/src/types'
import { deleteRSS, getRSSList, setRSS, getRSS, def_rss_item, getRSSLinkDetail } from '@/rss-parse/src/main.mjs'
import { revalidatePath } from 'next/cache'
import { RSSItemType } from '@/rss-parse/src/types'

export const getCategoriesAction: () => Promise<TorrentCategories> = () => client.getCategories()

export const getRSSListAction: () => Promise<RSSItemType[]> = () => {
  return Promise.resolve(Array.from(getRSSList()))
}

export const addRSSAction: (key: string, value: any) => Promise<boolean> = async (key, value) => {
  try {
    setRSS(key, value)

    revalidatePath('/rss')

    return Promise.resolve(true)
  } catch (e) {
    return Promise.reject(false)
  }
}

export const deleteRSSAction: (key: string) => Promise<boolean> = (key) => {
  revalidatePath('/rss')

  return Promise.resolve(deleteRSS(key))
}

export const getRSSAction: (key?: string) => Promise<ReturnType<typeof getRSS>> = (key) => {
  if (key) {
    return Promise.resolve(getRSS(key))
  } else {
    return Promise.resolve(def_rss_item)
  }
}

export const getRSSLinkDetailAction: typeof getRSSLinkDetail = (key) => getRSSLinkDetail(key)

export const downloadAction = async (key: string, torrent: string) => {
  const { download_categories, download_items = [] } = getRSS(key)

  const params = new URLSearchParams(new URL(torrent).search)
  const xt = params.get('xt') || ''

  const download_items_list = new Set(download_items)

  xt && download_items_list.add(xt)

  setRSS(key, { download_items: Array.from(download_items_list) })

  return addUrlsTorrent({
    urls: torrent,
    category: download_categories,
    autoTMM: 'true',
  })
    .then(console.log)
    .catch(console.log)
}
