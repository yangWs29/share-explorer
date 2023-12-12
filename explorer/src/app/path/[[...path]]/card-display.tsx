'use client'
import React from 'react'
import { usePathContext } from '@/app/path/context'
import { Card, Flex, List } from 'antd'
import { FileOutlined, FolderOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const CardDisplay: React.FC = () => {
  const pathname = usePathname()
  const { readdir } = usePathContext()

  return (
    <List
      grid={{ gutter: 0, xs: 3, md: 4, lg: 5, xl: 6, xxl: 7 }}
      dataSource={readdir}
      renderItem={(item) => {
        return (
          <List.Item style={{ padding: '0 8px' }}>
            <Card title={item.name}>
              <Link
                href={item.is_directory ? `${pathname}/${encodeURIComponent(item.name)}` : `${pathname}`}
                prefetch={false}
              >
                <Flex
                  justify={'center'}
                  align={'center'}
                  style={{ fontSize: '3em', padding: `${61.8 / 2}% 0`, position: 'relative' }}
                >
                  <span style={{ position: 'absolute' }}>
                    {item.is_directory ? <FolderOutlined /> : <FileOutlined />}
                  </span>
                </Flex>
              </Link>
            </Card>
          </List.Item>
        )
      }}
    />
  )
}

export default CardDisplay
