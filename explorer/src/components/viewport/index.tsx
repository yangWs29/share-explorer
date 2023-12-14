import React from 'react'
import { ViewportProvider } from '@/components/viewport/context'
import { cookies } from 'next/headers'

const Viewport: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { width, height } = JSON.parse(
    decodeURIComponent(cookies().get('viewport-size')?.value || JSON.stringify({ width: 0, height: 0 })),
  )

  return <ViewportProvider value={{ width, height }}>{children}</ViewportProvider>
}

export default Viewport
