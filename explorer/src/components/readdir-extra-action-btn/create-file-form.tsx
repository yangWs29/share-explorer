'use client'
import React from 'react'
import { App, Flex, Form, Input } from 'antd'
import SubmitBtn from '@/components/submit-btn'
import { createFileAction } from '@/components/readdir-extra-action-btn/action'
import { useUpdateReaddirList } from '@/app/path/readdir-context'
import { useReplacePathname } from '@/components/use-replace-pathname'

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const CreateFileForm: React.FC = () => {
  const { update } = useUpdateReaddirList()
  const { message: appMessage } = App.useApp()
  const { replace_pathname } = useReplacePathname()

  return (
    <Form
      labelCol={{ span: 2 }}
      initialValues={{ file_name: '新建文件.txt' }}
      onFinish={(values) => {
        const { file_name } = values

        createFileAction([replace_pathname, file_name].join('/'))
          .then(({ status, message }) => {
            if (status === 'error') {
              return Promise.reject({ status, message })
            }
            update()
            appMessage.success('新建文件成功').then()
          })
          .catch(({ message }) => {
            appMessage.error(`新建文件失败: ${message}`).then()
          })
      }}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item name="file_name" rules={[{ required: true, message: '请输入文名称' }]}>
        <Input />
      </Form.Item>

      <Form.Item>
        <Flex justify="flex-end">
          <SubmitBtn>创建</SubmitBtn>
        </Flex>
      </Form.Item>
    </Form>
  )
}

export default CreateFileForm
