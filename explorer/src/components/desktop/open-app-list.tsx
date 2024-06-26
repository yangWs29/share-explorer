'use client'
import React from 'react'
import { DockContext } from '@/components/desktop/dock/dock-context'
import ExplorerWindow from '@/components/desktop/explorer-window'
import WindowBox from '@/components/desktop/window-box'
import ConfigPage from '@/app/config/page'
import QBittorrentPage from '@/app/q-bittorrent/page'
import WindowBody from '@/components/desktop/window-body'

export const OpenAppList: React.FC = () => {
  const open_app_list = DockContext.useStore()

  return open_app_list.map((item, index) => {
    if (item.title === 'explorer') {
      return <ExplorerWindow key={item.title + index} window_id={index} />
    }
    if (item.title === 'qBittorrent') {
      return (
        <WindowBox key={item.title + index} window_id={index} auto_height={true} title={item.title}>
          <WindowBody>
            <QBittorrentPage />
          </WindowBody>
        </WindowBox>
      )
    }
    if (item.title === 'config') {
      return (
        <WindowBox key={item.title + index} window_id={index} auto_height={true} title={item.title}>
          <WindowBody>
            <ConfigPage />
          </WindowBody>
        </WindowBox>
      )
    }
  })
}
