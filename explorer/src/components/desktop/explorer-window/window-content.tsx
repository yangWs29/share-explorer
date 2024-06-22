'use client'
import React from 'react'
import { WindowBodyStyle } from '@/components/desktop/style'
import ExplorerBreadcrumb from '@/components/desktop/explorer-window/breadcrumb'
import WindowBox from '@/components/desktop/window-box'
import { Footer } from '@/app/path/[[...path]]/layout-footer'
import Page from '@/app/path/[[...path]]/page'

const WindowContent: React.FC<{ window_id: number }> = ({ window_id }) => {
  return (
    <WindowBox window_id={window_id} title={<ExplorerBreadcrumb />}>
      <WindowBodyStyle>
        <Page />
      </WindowBodyStyle>

      <Footer style={{ width: '100%', height: '40px', paddingTop: '15px' }} />
    </WindowBox>
  )
}

export default WindowContent
