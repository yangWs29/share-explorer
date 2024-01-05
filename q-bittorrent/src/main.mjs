import { QBittorrent } from '@ctrl/qbittorrent'

export const client = new QBittorrent({
  baseUrl: process.env.Q_BITTORRENT_BASE_URL,
  username: process.env.Q_BITTORRENT_USERNAME,
  password: process.env.Q_BITTORRENT_PASSWORD,
})

/**
 *
 * @returns {Promise<import('./types').TRANSFER_INFO_TYPE>}
 */
export const getTransferInfo = () => client.request('/transfer/info', 'GET')
