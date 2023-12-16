'use client'
import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import CreateFolderForm from '@/components/create-folder-btn/create-folder-form'

const CreateFolderBtn: React.FC = () => {
  const [open, changeOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          changeOpen(true)
        }}
      >
        创建文件夹
      </Button>
      <Modal open={open} onCancel={() => changeOpen(false)} title="新建文件夹" footer={false}>
        <CreateFolderForm />
      </Modal>
    </>
  )
}

export default CreateFolderBtn
