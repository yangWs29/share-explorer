'use client'
import React from 'react'
import { DockContext, useDockAction } from '@/components/desktop/dock/dock-context'
import { Button, Space } from 'antd'
import { app_list } from '@/components/desktop/window'

const Dock: React.FC = () => {
  const dock_list = DockContext.useStore()
  const { changeActivity } = useDockAction()

  return (
    <Space>
      {dock_list.map(({ title, activity }, index) => {
        return (
          <Button
            style={{ fontSize: '24px' }}
            key={title + index}
            size="large"
            type={activity ? 'primary' : 'default'}
            onClick={() => {
              changeActivity(index)
            }}
            icon={
              app_list.filter((item) => {
                return item.title === title
              })[0].icon
            }
          />
        )
      })}
    </Space>
  )
}

export default Dock
