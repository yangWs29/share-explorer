'use client'
import React from 'react'
import { Button, Card, List, Space } from 'antd'
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
  const readdir = useReaddirContext()
  const column = useCardColumnContext()
  const { joinSearchPath } = useReplacePathname()

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
              <Preview item={item} />

              {item.stat && (
                <Space direction="vertical">
                  <div style={{ height: '1.5em' }}>
                    {item.is_directory ? (
                      <FolderSizeBtn path={joinSearchPath(item.name)} />
                    ) : (
                      <Bit>{item.stat.size}</Bit>
                    )}
                  </div>
                  <div style={{ height: '1.5em' }}>
                    <DateFormat>{item.stat.mtimeMs}</DateFormat>
                  </div>
                </Space>
              )}
            </Card>
          </List.Item>
        )
      }}
    />
  )
}

export default CardDisplay
