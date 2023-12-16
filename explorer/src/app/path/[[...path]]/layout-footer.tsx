'use client'
import React from 'react'
import { Flex, Layout, Space } from 'antd'
import ReaddirCount from '@/components/readdir-count'
import DisplayType from '@/components/display-type'
import ChangeColumn from '@/app/path/[[...path]]/change-column'
import CreateFolderBtn from '@/components/create-folder-btn'

const LayoutFooter: React.FC = () => {
  return (
    <Layout.Footer style={{ padding: '0px 20px' }}>
      <Flex style={{ width: '100%', height: '40px' }} align="center">
        <Flex flex={1}>
          <Space>
            <CreateFolderBtn />

            <ReaddirCount />
          </Space>
        </Flex>

        <Flex justify="flex-end" flex={1}>
          <Space>
            <ChangeColumn />

            <DisplayType />
          </Space>
        </Flex>
      </Flex>
    </Layout.Footer>
  )
}

export default LayoutFooter
