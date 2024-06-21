'use client'
import React from 'react'
import { DockContext } from '@/components/desktop/dock/dock-context'
import ExplorerWindow from '@/components/desktop/explorer-window'

export const OpenAppList: React.FC = () => {
  const open_app_list = DockContext.useStore()

  return open_app_list.map((item, index) => {
    if (item.title === 'explorer') {
      return <ExplorerWindow key={item.title + index} window_id={index} />
    }
  })
}
