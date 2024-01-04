'use client'
import React from 'react'
import { Flex } from 'antd'
import GlobalTorrentSpeed from '@/app/q-bittorrent/global-torrent-speed'

const LayoutFooter: React.FC = () => {
  return (
    <Flex style={{ height: 40, padding: '0 20px' }} justify="flex-end" align="center">
      <GlobalTorrentSpeed />
    </Flex>
  )
}

export default LayoutFooter
