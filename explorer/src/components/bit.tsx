import React from 'react'
import { Space } from 'antd'
import { FileExclamationOutlined } from '@ant-design/icons'

const unit_type_list = ['Byte', 'KiB', 'MiB', 'GiB', 'TiB']

const Bit: React.FC<{ title?: React.ReactNode; icon?: boolean; children: React.ReactNode }> = ({
  title,
  children,
  icon = false,
}) => {
  let size = Number(children)
  let run = true
  let unit_level = 0

  while (run) {
    if (size > 1024) {
      size /= 1024

      unit_level += 1
    } else {
      run = false
    }
  }

  return (
    <Space>
      {icon ? <FileExclamationOutlined /> : title && <span>{title}</span>}
      {size ? (
        <span>
          {size.toFixed(unit_level === 0 ? 0 : 2)} {unit_type_list[unit_level]}
        </span>
      ) : (
        '-'
      )}
    </Space>
  )
}

export default Bit
