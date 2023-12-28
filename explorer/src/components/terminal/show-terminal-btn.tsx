'use client'
import React from 'react'
import { CodeOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { TerminalContext } from '@/components/terminal/terminal-context'
import { useReplacePathname } from '@/components/use-replace-pathname'

const ShowTerminalBtn: React.FC = () => {
  const dispatch = TerminalContext.useDispatch()
  const { replace_pathname } = useReplacePathname()

  return (
    <>
      <Button type={'text'} icon={<CodeOutlined />} onClick={() => dispatch(replace_pathname || '/')} />
    </>
  )
}

export default ShowTerminalBtn
