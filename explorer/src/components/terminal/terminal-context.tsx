'use client'
import createCtx from '@/lib/create-ctx'
import React from 'react'
import dynamic from 'next/dynamic'

const TerminalDrawer = dynamic(() => import('@/components/terminal/terminal-drawer'), { ssr: false })

export const TerminalContext = createCtx<string>('')

export const TerminalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <TerminalContext.ContextProvider value={''}>
      {children}
      <TerminalDrawer />
    </TerminalContext.ContextProvider>
  )
}
