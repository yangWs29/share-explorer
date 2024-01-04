'use client'
import createCtx from '@/lib/create-ctx'
import React from 'react'
import type { Torrent } from '@ctrl/qbittorrent/dist/src/types'

export const QBittorrentContext = createCtx<Torrent[]>()

export const QBittorrentProvider: React.FC<React.ProviderProps<Torrent[]>> = ({ children, value }) => {
  return <QBittorrentContext.ContextProvider value={value}>{children}</QBittorrentContext.ContextProvider>
}
