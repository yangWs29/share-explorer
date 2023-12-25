'use client'
import React, { createContext, useContext } from 'react'
import { useCookieState, useMount } from 'ahooks'

export type ViewportType = {
  width: number
  height: number
}

export const getWindowSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
})

export const viewportContext = createContext<ViewportType>(null!)

export const useViewport = () => {
  return useContext(viewportContext)
}

export const ViewportProvider: React.FC<React.ProviderProps<ViewportType>> = ({ value, children }) => {
  const [cookie_viewport, changeCookieViewport] = useCookieState('viewport-size')

  useMount(() => {
    const handleResize = () => {
      const { width, height } = getWindowSize()

      changeCookieViewport(JSON.stringify({ width, height }))
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  })

  const viewport = cookie_viewport ? JSON.parse(cookie_viewport) : value

  return <viewportContext.Provider value={viewport}>{children}</viewportContext.Provider>
}
