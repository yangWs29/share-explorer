import React, { useRef } from 'react'
import { WindowBodyStyle } from '@/components/desktop/style'
import { useInlinePathname } from '@/components/desktop/inline-path-context'
import { useMutationObserver, useScroll, useUpdateEffect } from 'ahooks'

const WindowBody: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { pathname } = useInlinePathname()
  const ref = useRef<HTMLDivElement>(null)
  const scroll_map = useRef<Map<string, number>>(new Map())

  const scroll = useScroll(ref)

  useUpdateEffect(() => {
    scroll && scroll_map.current?.set(pathname, scroll.top)
  }, [scroll])

  useMutationObserver(
    () => {
      const scroll_top = scroll_map.current?.get(pathname) || 0
      ref.current?.scrollTo(0, scroll_top)
    },
    ref,
    { childList: true, subtree: true },
  )

  return <WindowBodyStyle ref={ref}>{children}</WindowBodyStyle>
}

export default WindowBody
