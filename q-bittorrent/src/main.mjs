import { QBittorrent } from '@ctrl/qbittorrent'
import { getConfig } from '../../config-manager/edit-config.mjs'

const config = getConfig()

/**
 *
 * @type {typeof QBittorrent}
 */
let client = undefined

/**
 *
 * @return {QBittorrent}
 */
export const getClient = () => {
  if (client) {
    return client
  }

  if (config?.q_bittorrent?.base) {
    const { host, username, password } = config.q_bittorrent.base

    client = new QBittorrent({
      baseUrl: host,
      username: username,
      password: password,
    })
  } else {
    throw new Error('qBittorrent base undefined')
  }

  return client
}

/**
 *
 * @returns {Promise<import('./types').TRANSFER_INFO_TYPE>}
 */
export const getTransferInfo = () =>
  getClient()
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
  return getClient()
    .request('/sync/maindata', 'GET', { rid, full_update: false })
    .then((data) => {
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

  return getClient().request('/torrents/add', 'POST', undefined, form, {}, false)
}
