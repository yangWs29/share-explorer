'use client'
import React from 'react'
import { Space } from 'antd'
import { useGetTransferInfo } from '@/app/q-bittorrent/use-transfer-info'
import Bit from '@/components/bit'

const GlobalTorrentSpeed: React.FC = () => {
  const { data } = useGetTransferInfo()

  return (
    <Space split=" | ">
      <Space>
        <span>DHT</span>
        <span>{data?.dht_nodes}</span>
      </Space>
      <Space>
        <span>下载</span>
        <Bit
          after={
            <>
              /s（<Bit>{data?.dl_info_data}</Bit>）
            </>
          }
        >
          {data?.dl_info_speed}
        </Bit>
      </Space>
      <Space>
        <span>上传</span>
        <Bit
          after={
            <>
              /s（<Bit>{data?.up_info_data}</Bit>）
            </>
          }
        >
          {data?.up_info_speed}
        </Bit>
      </Space>
    </Space>
  )
}

export default GlobalTorrentSpeed
