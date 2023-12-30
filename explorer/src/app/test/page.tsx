'use client'
import React, { useState } from 'react'
import { useRequest } from 'ahooks'

const Page: React.FC = () => {
  const [text, changeText] = useState<string[]>([])

  useRequest(async () => {
    const res = await fetch('/test/stream-api/', { method: 'post' })

    if (res.body) {
      const reader = res.body.getReader()
      const decode = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()

        changeText((text) => {
          return [...text, decode.decode(value)]
        })

        if (done) {
          break
        }
      }
    }
  })

  return (
    <ul>
      {text.map((text) => (
        <li key={text}>{text}</li>
      ))}
    </ul>
  )
}

export default Page
