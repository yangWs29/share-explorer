'use client'
import createCtx from '@/lib/create-ctx'
import React from 'react'

export const DockContext = createCtx<
  {
    title: string
    hidden: boolean
    activity: boolean
    position: { offsetY: number; offsetX: number; zIndex: number }
  }[]
>()

let zIndex = 0

export const useDockAction = () => {
  const window_list = DockContext.useStore()
  const changeDock = DockContext.useDispatch()

  return {
    getWindowItem: (window_index: number) => {
      return window_list[window_index]
    },
    changeWindowPositionItem: (window_index: number, position: { offsetY: number; offsetX: number }) => {
      const item = window_list[window_index]
      item.position = {
        ...item.position,
        offsetX: item.position.offsetX + position.offsetX,
        offsetY: item.position.offsetY + position.offsetY,
      }

      changeDock([...window_list])
    },
    push: (window_type: string) => {
      const last_item = window_list[window_list.length - 1] || { position: { offsetY: 0, offsetX: 0 } }

      const list = [
        ...window_list.map((item) => {
          item.activity = false
          return item
        }),
        {
          title: window_type,
          hidden: false,
          activity: true,
          position: {
            offsetY: last_item.position.offsetY + 30,
            offsetX: last_item.position.offsetX + 30,
            zIndex: (zIndex += 1),
          },
        },
      ]

      changeDock(list)

      return list.length
    },
    remove: (window_index: number) => {
      window_list.splice(window_index, 1)
      changeDock([...window_list])
    },
    changeActivity: (window_index: number) => {
      window_list.map((item) => {
        item.activity = false
        return item
      })

      const item = window_list[window_index]

      item.position.zIndex = zIndex += 1

      changeDock([...window_list])
    },
  }
}

export const DockContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <DockContext.ContextProvider value={[]}>{children}</DockContext.ContextProvider>
}
