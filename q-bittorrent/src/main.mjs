import { QBittorrent } from '@ctrl/qbittorrent'
import { FormData } from 'node-fetch-native'

export const client = new QBittorrent({
  baseUrl: process.env.Q_BITTORRENT_BASE_URL,
  username: process.env.Q_BITTORRENT_USERNAME,
  password: process.env.Q_BITTORRENT_PASSWORD,
})

/**
 *
 * @returns {Promise<import('./types').TRANSFER_INFO_TYPE>}
 */
export const getTransferInfo = () =>
  client
    .request('/transfer/info', 'GET', { time: Date.now() }, undefined, { 'Cache-Control': 'no-cache' })
    .then((data) => {
      console.log({ data })
      return data
    })

/**
 *
 * @returns {Promise<{
 * rid:number,
 * server_state: import('./types').TRANSFER_INFO_TYPE,
 * torents: {[key: string]: import('./types').SyncMainDataTorrentItemType
 * }}>}
 */
let rid = undefined
export const getSyncMainData = () => {
  return client.request('/sync/maindata', 'GET', { rid, full_update: false }).then((data) => {
    rid = data.rid
    return { rid: data.rid, server_state: data.server_state }
  })
}

/**
 *
 * @param {import('./types').AddUrlsTorrentType} options
 * @return {Promise<boolean>}
 */
export const addUrlsTorrent = (options) => {
  const form = new FormData()

  for (const [key, value] of Object.entries(options)) {
    form.append(key, `${value}`)
  }

  return client.request(
    '/torrents/add',
    'POST',
    undefined,
    form,
    {},
    false,
  )
}
