export * from '@ctrl/qbittorrent/dist/src/types'

/**
 * https://github.com/qbittorrent/qBittorrent/wiki/WebUI-API-(qBittorrent-4.1)#get-global-transfer-info
 */
export type TRANSFER_INFO_TYPE = {
  connection_status: 'connected' | 'firewalled' | 'disconnected'
  dht_nodes: number
  dl_info_data: number
  dl_info_speed: number
  dl_rate_limit: number
  up_info_data: number
  up_info_speed: number
  up_rate_limit: number
}

export type SyncMainDataTorrentItemType = {
  amount_left: number
  completed: number
  dlspeed: number
  downloaded: number
  downloaded_session: number
  eta: number
  num_leechs: number
  progress: number
  ratio: number
  seen_complete: number
  time_active: number
  upspeed: number
}

type TrueFalseStr = 'true' | 'false'

export type AddUrlsTorrentType = {
  urls: string
  savepath?: string
  category?: string
  tags?: string[]
  skip_checking?: TrueFalseStr
  paused?: TrueFalseStr
  root_folder?: TrueFalseStr
  rename?: string
  upLimit?: number
  dlLimit?: number
  ratioLimit?: number
  seedingTimeLimit?: number
  autoTMM?: TrueFalseStr
  sequentialDownload?: TrueFalseStr
  firstLastPiecePrio?: TrueFalseStr
}
