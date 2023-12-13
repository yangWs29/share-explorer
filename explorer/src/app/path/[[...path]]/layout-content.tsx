'use client'
import React, { useEffect, useRef } from 'react'
import { Layout } from 'antd'
import { usePathname } from 'next/navigation'

const height_map = new Map()

const LayoutContent: React.FC<React.PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const scroll_top = height_map.get(pathname) || 0

    if (scroll_top) {
      ref.current?.scrollTo(0, scroll_top)
    }
  }, [pathname, ref])

  return (
    <Layout.Content
      ref={ref}
      style={{
        overscrollBehavior: 'contain',
        overflowY: 'scroll',
      }}
      onClick={(e) => {
        height_map.set(pathname, e.currentTarget.scrollTop)
      }}
    >
      {children}
    </Layout.Content>
  )
}

export default LayoutContent
