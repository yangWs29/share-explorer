'use client'
import React, { useState } from 'react'
import { Button, Dropdown, Modal } from 'antd'
import CreateFolderForm from '@/components/readdir-extra-action-btn/create-folder-form'
import { FileOutlined, FolderOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import CreateFileForm from '@/components/readdir-extra-action-btn/create-file-form'
import { useUpdateReaddirList } from '@/app/path/readdir-context'

const ReaddirExtraActionBtn: React.FC = () => {
  const [open, changeOpen] = useState<'folder' | 'file' | undefined>(undefined)
  const { update } = useUpdateReaddirList()

  return (
    <>
      <Dropdown
        placement="top"
        arrow={true}
        trigger={['hover', 'click']}
        menu={{
          items: [
            {
              key: 'create-folder',
              icon: <FolderOutlined />,
              label: '创建文件夹',
              onClick: () => {
                changeOpen('folder')
              },
            },
            {
              key: 'create-file',
              icon: <FileOutlined />,
              label: '创建文件',
              onClick: () => {
                changeOpen('file')
              },
            },
            {
              key: 'reload',
              icon: <ReloadOutlined />,
              label: '刷新',
              onClick: update,
            },
          ],
        }}
      >
        <Button icon={<PlusOutlined />} />
      </Dropdown>

      <Modal
        open={!!open}
        onCancel={() => changeOpen(undefined)}
        title={open === 'folder' ? '新建文件夹' : '新建文件'}
        footer={false}
      >
        {open === 'folder' ? <CreateFolderForm /> : <CreateFileForm />}
      </Modal>
    </>
  )
}

export default ReaddirExtraActionBtn
