'use client'
import React from 'react'
import { Button, Dropdown, Modal } from 'antd'
import { useCreateFolderForm } from '@/components/readdir-extra-action-btn/create-folder-form'
import { FileOutlined, FolderOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { useCreateFile } from '@/components/readdir-extra-action-btn/create-file-form'
import { useUpdateReaddirList } from '@/app/path/readdir-context'

const ReaddirExtraActionBtn: React.FC = () => {
  const { update } = useUpdateReaddirList()
  const [modal, contextHolder] = Modal.useModal()
  const { createFolder, createFolderFormContent } = useCreateFolderForm()
  const { createFile, createFileFormContent } = useCreateFile()

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
                modal.confirm({
                  title: '新建文件夹',
                  icon: null,
                  content: createFolderFormContent,
                  onOk: createFolder,
                  okText: '创建',
                  cancelText: '取消',
                })
              },
            },
            {
              key: 'create-file',
              icon: <FileOutlined />,
              label: '创建文件',
              onClick: () => {
                modal.confirm({
                  title: '新建文件',
                  icon: null,
                  content: createFileFormContent,
                  onOk: createFile,
                  okText: '创建',
                  cancelText: '取消',
                })
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

      {contextHolder}
    </>
  )
}

export default ReaddirExtraActionBtn
