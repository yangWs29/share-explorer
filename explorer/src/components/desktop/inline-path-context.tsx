'use client'
import createCtx from '@/lib/create-ctx'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { explorerPath, replacePath } from '@/components/use-replace-pathname'

export const InlinePathContext = createCtx<string>(null!)

export const useInlinePathname = () => {
  const inline_path = decodeURIComponent(InlinePathContext.useStore())
  const browser_pathname = usePathname()

  return { pathname: inline_path || browser_pathname || '', is_inline: !!inline_path }
}

export const useInlineRouter = () => {
  const { is_inline } = useInlinePathname()
  const changePath = InlinePathContext.useDispatch()
  const router = useRouter()

  return {
    push: (path: string) => {
      if (is_inline) {
        changePath(replacePath(path))
      } else {
        router.push(explorerPath(path))
      }
    },
  }
}

export const InlinePathContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <InlinePathContext.ContextProvider value={'/'}>{children}</InlinePathContext.ContextProvider>
}
