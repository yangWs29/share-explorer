import React from 'react'
import { Button, Dropdown } from 'antd'
import { AppstoreOutlined, EyeOutlined, TableOutlined } from '@ant-design/icons'
import { useDisplayTypeContext, useDisplayTypeContextDispatch } from '@/app/path/display-type-context'

const DisplayType: React.FC = () => {
  const display_type = useDisplayTypeContext()
  const changeDisplayType = useDisplayTypeContextDispatch()

  return (
    <Dropdown
      placement="top"
      arrow={true}
      trigger={['hover', 'click']}
      menu={{
        selectedKeys: [display_type],
        items: [
          {
            key: 'card',
            icon: <AppstoreOutlined />,
            onClick: () => {
              changeDisplayType('card')
            },
            label: '卡片',
          },
          {
            key: 'table',
            icon: <TableOutlined />,
            onClick: () => {
              changeDisplayType('table')
            },
            label: '表格',
          },
        ],
      }}
    >
      <Button icon={<EyeOutlined />} />
    </Dropdown>
  )
}

export default DisplayType
