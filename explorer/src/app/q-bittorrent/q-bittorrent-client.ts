import { QBittorrent } from '@ctrl/qbittorrent'

export const client = new QBittorrent({
  baseUrl: 'http://192.168.31.17:8080/',
  username: process.env.Q_BITTORRENT_USERNAME,
  password: process.env.Q_BITTORRENT_PASSWORD,
})
