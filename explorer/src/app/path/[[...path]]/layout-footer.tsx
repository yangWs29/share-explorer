'use client'
import React, { CSSProperties } from 'react'
import { Flex, Layout, Space } from 'antd'
import ReaddirCount from '@/components/readdir-count'
import DisplayType from '@/components/display-type'
import ChangeColumn from '@/app/path/[[...path]]/change-column'
import ReaddirExtraActionBtn from '@/components/readdir-extra-action-btn'
import { DfDisplay } from '@/components/df-context'
import ReaddirSortDropdown from '@/components/readdir-sort/readdir-sort-dropdown'

export const Footer: React.FC<{ style?: CSSProperties }> = ({ style }) => {
  return (
    <Flex style={style} align="center">
      <Flex flex={1}>
        <Space>
          <ReaddirExtraActionBtn />

          <ReaddirCount />
        </Space>
      </Flex>

      <Flex flex={1} justify="center" align="center">
        <DfDisplay />
      </Flex>

      <Flex justify="flex-end" flex={1}>
        <Space>
          <ChangeColumn />

          <ReaddirSortDropdown />

          <DisplayType />
        </Space>
      </Flex>
    </Flex>
  )
}

const LayoutFooter: React.FC = () => {
  return (
    <Layout.Footer style={{ padding: '0px 20px' }}>
      <Footer style={{ width: '100%', height: '40px' }} />
    </Layout.Footer>
  )
}

export default LayoutFooter
