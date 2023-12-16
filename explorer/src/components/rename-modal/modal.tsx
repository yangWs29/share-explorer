'use client'
import React from 'react'
import { Modal } from 'antd'
import { isEmpty } from 'lodash'
import { useRenameDispatch, useRenameStore } from '@/components/rename-modal/rename-context'
import RenameForm from '@/components/rename-modal/rename-form'

const MoveModal: React.FC = () => {
  const rename_old_path = useRenameStore()
  const renameDispatch = useRenameDispatch()

  return (
    <Modal
      title="移动"
      open={!isEmpty(rename_old_path.path)}
      width={1000}
      onCancel={() => renameDispatch('')}
      footer={false}
      destroyOnClose={true}
    >
      <RenameForm />
    </Modal>
  )
}

export default MoveModal
