'use client'
import React from 'react'
import { Flex, Layout, Space } from 'antd'
import ReaddirCount from '@/components/readdir-count'
import DisplayType from '@/components/display-type'

const LayoutFooter: React.FC = () => {
  return (
    <Layout.Footer style={{ padding: '0px 20px' }}>
      <Flex style={{ width: '100%', height: '40px' }} align="center">
        <Flex flex={1}>
          <Space>
            <ReaddirCount />
          </Space>
        </Flex>

        <Flex justify="flex-end" flex={1}>
          <Space>
            <DisplayType />
          </Space>
        </Flex>
      </Flex>
    </Layout.Footer>
  )
}

export default LayoutFooter
