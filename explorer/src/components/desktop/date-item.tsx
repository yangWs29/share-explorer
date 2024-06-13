'use client'
import React, { useState } from 'react'
import { useInterval } from 'ahooks'
import dayjs from 'dayjs'

const DateItem: React.FC = () => {
  const [time, setTime] = useState(dayjs().format('YYYY年MM月DD日 HH:mm'))

  useInterval(() => {
    setTime(dayjs().format('YYYY年MM月DD日 HH:mm'))
  }, 1000)

  return <div>{time}</div>
}

export default DateItem
