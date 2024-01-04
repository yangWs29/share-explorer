import React from 'react'
import { client } from '@/app/q-bittorrent/q-bittorrent-client'
import { QBittorrentProvider } from '@/app/q-bittorrent/q-bittorrent-context'
import TorrentTable from '@/app/q-bittorrent/torrent-table'

const Page: React.FC = async () => {
  const data = await client.listTorrents()

  return (
    <QBittorrentProvider value={data}>
      <TorrentTable />
    </QBittorrentProvider>
  )
}

export default Page
