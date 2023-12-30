import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import AntdStyledComponentsRegistry from '@/lib/antd-registry'
import Viewport from '@/components/viewport'
import StyledComponentsRegistry from '@/lib/styled-components-registry'
import InjectCookieChangeThemeProvider from '@/components/change-theme/inject-cookie'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '从零开始-文件资源管理器',
  description: '从零开始-文件资源管理器',
}

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body className={inter.className}>
      <InjectCookieChangeThemeProvider>
        <StyledComponentsRegistry>
          <AntdStyledComponentsRegistry>
            <Viewport>{children}</Viewport>
          </AntdStyledComponentsRegistry>
        </StyledComponentsRegistry>
      </InjectCookieChangeThemeProvider>
    </body>
  </html>
)
export default RootLayout
