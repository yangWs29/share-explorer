import React from 'react'
import { Button } from 'antd'
import { usePathContext } from '@/app/path/context'

const ChangeDisplayType: React.FC = () => {
  const { changeDisplayType, display_type } = usePathContext()

  return (
    <Button
      onClick={() => {
        changeDisplayType(display_type === 'table' ? 'card' : 'table')
      }}
    >
      display
    </Button>
  )
}

export default ChangeDisplayType
