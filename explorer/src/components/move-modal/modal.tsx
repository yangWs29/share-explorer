'use client'
import React from 'react'
import { Modal } from 'antd'
import { isEmpty } from 'lodash'
import MoveForm from '@/components/move-modal/move-form'
import { useMovePathDispatch, useMovePathStore } from '@/components/move-modal/move-path-context'

const MoveModal: React.FC = () => {
  const move_path = useMovePathStore()
  const changeMovePath = useMovePathDispatch()

  return (
    <Modal
      title="移动"
      open={!isEmpty(move_path)}
      width={1000}
      onCancel={() => changeMovePath('')}
      footer={false}
      destroyOnClose={true}
    >
      <MoveForm />
    </Modal>
  )
}

export default MoveModal
