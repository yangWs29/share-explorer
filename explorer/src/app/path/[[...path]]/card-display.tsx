'use client'
import React from 'react'
import { Button, Card, Flex, List } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Bit from '@/components/bit'
import DateFormat from '@/components/date-format'
import { useReaddirContext } from '@/app/path/readdir-context'
import { useCardColumnContext } from '@/app/path/card-colunm-context'
import Preview from '@/components/preview'
import ActionDropdown from '@/components/action-dropdown'
import { EllipsisOutlined } from '@ant-design/icons'
import { FolderSizeBtn } from '@/components/folder-size'
import { useReplacePathname } from '@/components/use-replace-pathname'

const CardDisplay: React.FC = () => {
  const pathname = usePathname()
  const readdir = useReaddirContext()
  const column = useCardColumnContext()
  const { joinSearchPath, joinPath } = useReplacePathname()

  return (
    <List
      grid={{ gutter: 0, column: column }}
      dataSource={readdir}
      renderItem={(item) => {
        return (
          <List.Item style={{ padding: '0 8px' }}>
            <Card
              title={item.name}
              extra={
                <ActionDropdown item={item}>
                  <Button icon={<EllipsisOutlined />} />
                </ActionDropdown>
              }
            >
              <Link href={item.is_directory ? joinPath(item.name) : `${pathname}`} prefetch={false}>
                <Flex
                  justify={'center'}
                  align={'center'}
                  style={{ fontSize: '3em', padding: `${61.8 / 2}% 0`, position: 'relative' }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Preview item={item} />
                  </div>
                </Flex>
              </Link>
              {item.stat && (
                <Flex justify="space-between" wrap="wrap">
                  <Flex flex="1 0 auto" style={{ marginRight: 20 }}>
                    {item.is_directory ? (
                      <FolderSizeBtn path={joinSearchPath(item.name)} />
                    ) : (
                      <Bit>{item.stat.size}</Bit>
                    )}
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
