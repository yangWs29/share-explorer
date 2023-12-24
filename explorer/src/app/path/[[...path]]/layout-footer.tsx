'use client'
import React from 'react'
import { Flex, Layout, Space } from 'antd'
import ReaddirCount from '@/components/readdir-count'
import DisplayType from '@/components/display-type'
import ChangeColumn from '@/app/path/[[...path]]/change-column'
import CreateFolderBtn from '@/components/create-folder-btn'
import { DfDisplay } from '@/components/df-context'
import { ReloadReaddirButton } from '@/components/reload-readdir-button'
import ReaddirSort from '@/components/readdir-sort'

const LayoutFooter: React.FC = () => {
  return (
    <Layout.Footer style={{ padding: '0px 20px' }}>
      <Flex style={{ width: '100%', height: '40px' }} align="center">
        <Flex flex={1}>
          <Space>
            <Space.Compact>
              <ReloadReaddirButton />

              <CreateFolderBtn />
            </Space.Compact>

            <ReaddirCount />
          </Space>
        </Flex>

        <Flex flex={1} justify="center" align="center">
          <DfDisplay />
        </Flex>

        <Flex justify="flex-end" flex={1}>
          <Space>
            <ChangeColumn />

            <ReaddirSort />

            <DisplayType />
          </Space>
        </Flex>
      </Flex>
    </Layout.Footer>
  )
}

export default LayoutFooter
