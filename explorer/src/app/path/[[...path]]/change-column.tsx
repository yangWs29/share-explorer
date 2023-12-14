'use client'
import React from 'react'
import { Button, Flex, InputNumber, Slider, Space } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { usePathContext } from '@/app/path/context'
import { useViewport } from '@/components/viewport/context'

const SliderChangeColumn: React.FC = () => {
  const { column, changeColumn } = usePathContext()
  const { width } = useViewport()

  return (
    <Flex>
      <Space>
        <Slider
          max={14}
          min={1}
          style={{ width: '10em' }}
          defaultValue={column}
          value={column}
          onChange={(value) => {
            changeColumn(value)
          }}
        />

        <Space.Compact>
          <InputNumber
            controls={false}
            style={{ width: '2em' }}
            max={14}
            min={1}
            value={column}
            onChange={(number) => number && changeColumn(number)}
          />
          <Button icon={<ReloadOutlined />} onClick={() => changeColumn(Math.ceil(width / 280))} />
        </Space.Compact>
      </Space>
    </Flex>
  )
}

const ChangeColumn: React.FC = () => {
  const { display_type } = usePathContext()

  return display_type === 'card' && <SliderChangeColumn />
}

export default ChangeColumn
