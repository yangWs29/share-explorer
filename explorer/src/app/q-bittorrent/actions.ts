'use server'
import { client } from '@/app/q-bittorrent/q-bittorrent-client'

/**
 * https://github.com/qbittorrent/qBittorrent/wiki/WebUI-API-(qBittorrent-4.1)#get-global-transfer-info
 */
type Info = {
  connection_status: 'connected' | 'firewalled' | 'disconnected'
  dht_nodes: number
  dl_info_data: number
  dl_info_speed: number
  dl_rate_limit: number
  up_info_data: number
  up_info_speed: number
  up_rate_limit: number
}
export const getTransferInfo = () => client.request<Info>('/transfer/info', 'GET')
