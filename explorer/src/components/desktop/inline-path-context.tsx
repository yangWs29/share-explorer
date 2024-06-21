'use client'
import createCtx from '@/lib/create-ctx'
import React from 'react'
import { usePathname } from 'next/navigation'

export const InlinePathContext = createCtx<string>(null!)

export const useInlinePathname = () => {
  const inline_path = InlinePathContext.useStore()
  const browser_pathname = usePathname()
  const pathname = inline_path || browser_pathname || ''

  return {
    pathname: pathname,
  }
}

export const InlinePathContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <InlinePathContext.ContextProvider value={'/'}>{children}</InlinePathContext.ContextProvider>
}
