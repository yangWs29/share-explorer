'use client'
import React from 'react'
import { InlinePathContextProvider } from '@/components/desktop/inline-path-context'

const DesktopContext: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <InlinePathContextProvider>{children}</InlinePathContextProvider>
}

export default DesktopContext
