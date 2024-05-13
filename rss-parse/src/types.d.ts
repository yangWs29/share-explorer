/// <reference lib="es2015" />

export type RSSItemType = {
  key: string
  name: string
  status: 'normal' | 'deactivate'
  update_interval: number
  rss_link: string
  type: 'default'
  include: string
  exclude: string
  download_categories: string
  download_items?: string[]
}

export type RSSMAPType = Map<string, RSSItemType>
