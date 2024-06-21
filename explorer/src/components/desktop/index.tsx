import React from 'react'
import Window from '@/components/desktop/window'
import { DockContextProvider } from '@/components/desktop/dock/dock-context'
import { OpenAppList } from '@/components/desktop/open-app-list'
import { WindowDndContext } from '@/components/desktop/dnd'

const Desktop: React.FC = () => {
  return (
    <DockContextProvider>
      <WindowDndContext>
        <Window>
          <OpenAppList />
        </Window>
      </WindowDndContext>
    </DockContextProvider>
  )
}

export default Desktop
