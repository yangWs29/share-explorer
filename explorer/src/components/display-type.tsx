import React from 'react'
import { Button, Space } from 'antd'
import { AppstoreOutlined, TableOutlined } from '@ant-design/icons'
import { useDisplayTypeContext, useDisplayTypeContextDispatch } from '@/app/path/display-type-context'

const DisplayType: React.FC = () => {
  const display_type = useDisplayTypeContext()
  const changeDisplayType = useDisplayTypeContextDispatch()

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
