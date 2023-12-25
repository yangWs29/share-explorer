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
      title="重命名"
      open={!isEmpty(rename_old_path.path)}
      width="75%"
      onCancel={() => renameDispatch('')}
      footer={false}
      destroyOnClose={true}
    >
      <RenameForm />
    </Modal>
  )
}

export default MoveModal
