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
