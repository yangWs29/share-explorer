'use client'
import React, { useRef, useState } from 'react'
import { useMount } from 'ahooks'
import { io, Socket } from 'socket.io-client'
import { Button } from 'antd'

const TestSocket: React.FC = () => {
  const [message, changeMessage] = useState<string[]>([])
  const socket_ref = useRef<Socket>()

  useMount(() => {
    const s_io = io({ path: '/api/hello', addTrailingSlash: true })

    socket_ref.current = s_io

    s_io.on('message', (msg) => {
      changeMessage((message) => {
        return [msg, ...message]
      })
    })
  })

  return (
    <>
      <Button
        onClick={() => {
          socket_ref.current?.emit('message', Date.now())
        }}
      >
        发送
      </Button>
      <ul>
        {message.map((text, key) => (
          <li key={key}>{text}</li>
        ))}
      </ul>
    </>
  )
}

export default TestSocket
