'use client'
import React from 'react'
import { Card, Flex, List } from 'antd'
import { FileOutlined, FolderOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Bit from '@/components/bit'
import DateFormat from '@/components/date-format'
import { useReaddirContext } from '@/app/path/readdir-context'
import { useCardColumnContext } from '@/app/path/card-colunm-context'

const CardDisplay: React.FC = () => {
  const pathname = usePathname()
  const readdir = useReaddirContext()
  const column = useCardColumnContext()

  return (
    <List
      grid={{ gutter: 0, column: column }}
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
              {item.stat && (
                <Flex justify="space-between" wrap="wrap">
                  <Flex flex="1 0 auto" style={{ marginRight: 20 }}>
                    {item.is_directory ? '-' : <Bit>{item.stat.size}</Bit>}
                  </Flex>
                  <Flex>
                    <DateFormat>{item.stat.mtimeMs}</DateFormat>
                  </Flex>
                </Flex>
              )}
            </Card>
          </List.Item>
        )
      }}
    />
  )
}

export default CardDisplay
