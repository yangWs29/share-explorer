'use client'
import React from 'react'
import { WindowCloseButton, WindowItemStyle } from '@/components/desktop/style'
import { useDockAction } from '@/components/desktop/dock/dock-context'
import { useWindowDraggable } from '@/components/desktop/dnd'
import { Card, CardProps, Space } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

const WindowBox: React.FC<{ window_id: number } & CardProps> = ({ children, window_id, ...props }) => {
  const { remove, getWindowItem, changeActivity } = useDockAction()
  const { setNodeRef, style, draggable_button, listeners, attributes } = useWindowDraggable({ id: window_id })

  const { position, activity } = getWindowItem(window_id)

  return (
    <WindowItemStyle
      ref={setNodeRef}
      style={{
        transform: `translate3d(${position.offsetX}px, ${position.offsetY}px, 0)`,
        zIndex: activity ? 101 : 100,
        ...style,
      }}
      onClick={() => {
        changeActivity(window_id)
      }}
    >
      <Card
        title={
          <Space style={{ width: '100%' }} {...listeners} {...attributes}>
            {props.title}
          </Space>
        }
        extra={
          <Space>
            {draggable_button}
            <WindowCloseButton
              icon={<CloseOutlined />}
              type="text"
              onClick={(e) => {
                e.stopPropagation()
                remove(window_id)
              }}
            />
          </Space>
        }
        styles={{ body: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}
        style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        {children}
      </Card>
    </WindowItemStyle>
  )
}

export default WindowBox
