'use client'
import React, { useState } from 'react'
import { Card, Popover } from 'antd'
import styled from 'styled-components'
import { OnSelectType, Tree } from '@/components/readdir-tree'

const PopoverItem = styled(Card)`
  overflow-y: scroll;
  overscroll-behavior: contain;
  max-height: 30vh;
`

const SelectPathInput: React.FC<React.PropsWithChildren & { onSelect: OnSelectType; highlight_path?: string }> = ({
  children,
  onSelect,
  highlight_path,
}) => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (new_open: boolean) => {
    setOpen(new_open)
  }

  return (
    <Popover
      content={
        <PopoverItem>
          <Tree onSelect={onSelect} highlight_path={highlight_path} />
        </PopoverItem>
      }
      placement="bottomLeft"
      title="目录"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      arrow={false}
    >
      <>{children}</>
    </Popover>
  )
}

export default SelectPathInput
