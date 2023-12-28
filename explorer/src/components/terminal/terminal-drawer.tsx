'use client'
import React, { useEffect, useRef } from 'react'
import { Drawer } from 'antd'
import { TerminalContext } from '@/components/terminal/terminal-context'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import { io, Socket } from 'socket.io-client'
import { debounce } from 'lodash'
import styled from 'styled-components'

const TerminalItemStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const proposeDimensions = (terminal_dom_ref: HTMLDivElement | null) => {
  if (terminal_dom_ref) {
    const { clientWidth: width, clientHeight: height } = terminal_dom_ref

    const line_height = 18
    const font_width = 9

    return {
      rows: Math.floor(height / line_height),
      cols: Math.floor(width / font_width),
    }
  }

  return {
    rows: 30,
    cols: 80,
  }
}

export const TerminalItem: React.FC = () => {
  const terminal_dom_ref = useRef<HTMLDivElement>(null)
  const terminal_path = TerminalContext.useStore()
  const terminal_ref = useRef<Terminal>()
  const socket_ref = useRef<Socket>()

  // 开发环境下热更新时销毁原先的终端
  terminal_ref.current?.dispose()

  useEffect(() => {
    const terminal_dom = document.getElementById('terminal')

    const terminal = (terminal_ref.current = new Terminal({
      ...proposeDimensions(terminal_dom_ref.current),
      fontSize: 15,
    }))

    const socket = (socket_ref.current = io({
      path: '/api/terminal-socket',
      addTrailingSlash: true,
    }))

    const updateTerminal = debounce(() => {
      if (terminal_dom_ref.current) {
        const { rows, cols } = proposeDimensions(terminal_dom_ref.current)

        socket.emit('update-pty', { rows, cols })

        terminal.resize(cols, rows)
      }
    }, 500)

    socket.emit('init-pty', terminal_path)

    socket.on('cmd-res', (msg: string) => {
      terminal.write(msg)
    })

    terminal_dom && terminal.open(terminal_dom)

    socket.on('init-pty-done', () => {})

    terminal.onData((key) => {
      socket.emit('cmd', key)
    })

    window.onresize = updateTerminal

    return () => {
      terminal.dispose()
      socket.disconnect()
    }
  }, [terminal_path])

  return (
    <TerminalItemStyle ref={terminal_dom_ref}>
      <div id="terminal" />
    </TerminalItemStyle>
  )
}

const TerminalDrawer: React.FC = () => {
  const dispatch = TerminalContext.useDispatch()
  const terminal_path = TerminalContext.useStore()

  return (
    <Drawer
      title="终端"
      open={!!terminal_path}
      placement="bottom"
      destroyOnClose={true}
      height="50vh"
      onClose={() => dispatch('')}
      styles={{ body: { padding: '10px' } }}
      footer={false}
    >
      <TerminalItem />
    </Drawer>
  )
}

export default TerminalDrawer
