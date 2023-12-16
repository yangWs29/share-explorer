import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button, ButtonProps } from 'antd'

const SubmitBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
  const { pending } = useFormStatus()

  return (
    <Button {...props} htmlType="submit" loading={pending}>
      {children}
    </Button>
  )
}

export default SubmitBtn
