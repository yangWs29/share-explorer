import React from 'react'
import { Button, Space } from 'antd'
import { usePathContext } from '@/app/path/context'
import { AppstoreOutlined, TableOutlined } from '@ant-design/icons'

const DisplayType: React.FC = () => {
  const { display_type, changeDisplayType } = usePathContext()

  return (
    <Space>
      {display_type === 'table' && (
        <Button
          icon={<AppstoreOutlined />}
          onClick={() => {
            changeDisplayType('card')
          }}
        />
      )}
      {display_type === 'card' && (
        <Button
          icon={<TableOutlined />}
          onClick={() => {
            changeDisplayType('table')
          }}
        />
      )}
    </Space>
  )
}

export default DisplayType
