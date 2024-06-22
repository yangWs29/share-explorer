'use client'
import React, { CSSProperties } from 'react'
import { DndContext, MouseSensor, useDraggable, useDroppable, useSensor, useSensors } from '@dnd-kit/core'
import { Button } from 'antd'
import { DragOutlined } from '@ant-design/icons'
import { useDockAction } from '@/components/desktop/dock/dock-context'

export const useWindowDraggable = ({ id }: { id: number }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${id}`,
    data: { type: 'window', id: id },
  })
  const { getWindowItem } = useDockAction()

  const { position } = getWindowItem(id)

  const style: CSSProperties = transform
    ? {
        transform: `translate3d(${position.offsetX + transform.x}px, ${position.offsetY + transform.y}px, 0)`,
      }
    : {}

  return {
    setNodeRef,
    style,
    draggable_button: <Button {...listeners} {...attributes} icon={<DragOutlined />} />,
    attributes,
    listeners,
  }
}

export const Droppable: React.FC<React.PropsWithChildren & { id?: string }> = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${props.id}`,
  })

  const style: CSSProperties = {
    backgroundColor: isOver ? 'rgba(255,255,255,.1)' : undefined,
  }

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  )
}

export const WindowDndContext: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { changeWindowPositionItem } = useDockAction()
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 8 } }))

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={(event) => {
        const { active, delta } = event

        active &&
          changeWindowPositionItem(active.data.current?.id, {
            offsetY: delta.y,
            offsetX: delta.x,
          })
      }}
    >
      <Droppable>{children}</Droppable>
    </DndContext>
  )
}
