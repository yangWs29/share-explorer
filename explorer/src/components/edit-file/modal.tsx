'use client'
import React, { useRef } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { EditFileContext } from '@/components/edit-file/edit-file-context'
import { Button, Card, Flex, Modal, Space } from 'antd'
import { useRequest } from 'ahooks'
import { getEditFileContentAction, writeFileAction } from '@/components/edit-file/action'

const EditContent: React.FC = () => {
  const edit_file_path = EditFileContext.useStore()
  const { data, loading } = useRequest(() => getEditFileContentAction(edit_file_path))
  const file_content = useRef<string>('')
  const editFileDispatch = EditFileContext.useDispatch()

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card loading={loading} bordered={false}>
        <CodeMirror
          value={data}
          maxHeight={'60vh'}
          minHeight={'15em'}
          theme="dark"
          onChange={(value) => {
            file_content.current = value
          }}
        />
      </Card>
      <Flex justify="end">
        <Button
          onClick={() => {
            writeFileAction(edit_file_path, file_content.current).then(() => {
              editFileDispatch('')
            })
          }}
        >
          保存
        </Button>
      </Flex>
    </Space>
  )
}

const EditFileModal = () => {
  const edit_file_path = EditFileContext.useStore()
  const editFileDispatch = EditFileContext.useDispatch()

  return (
    <Modal
      title={decodeURIComponent(edit_file_path.split('/').pop() || '')}
      width="75%"
      footer={null}
      destroyOnClose={true}
      open={!!edit_file_path}
      onCancel={() => {
        editFileDispatch('')
      }}
    >
      <EditContent />
    </Modal>
  )
}
export default EditFileModal
