'use client'
import React from 'react'
import { App, Flex, Form, Input } from 'antd'
import SubmitBtn from '@/components/submit-btn'
import { createFolder } from '@/components/create-folder-btn/action'
import { useUpdateReaddirList } from '@/app/path/readdir-context'
import { useReplacePathname } from '@/components/use-replace-pathname'

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const CreateFolderForm: React.FC = () => {
  const { update } = useUpdateReaddirList()
  const { message: appMessage } = App.useApp()
  const { replace_pathname } = useReplacePathname()

  return (
    <Form
      labelCol={{ span: 2 }}
      initialValues={{ dir_name: '新建文件夹' }}
      onFinish={(values) => {
        const { dir_name } = values

        createFolder([replace_pathname, dir_name].join('/'))
          .then(({ status, message }) => {
            if (status === 'error') {
              return Promise.reject({ status, message })
            }
            update()
            appMessage.success('新建文件夹成功').then()
          })
          .catch(({ message }) => {
            appMessage.error(`新建文件夹失败: ${message}`).then()
          })
      }}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item name="dir_name" rules={[{ required: true, message: '请输入文件夹名称' }]}>
        <Input />
      </Form.Item>

      <Form.Item>
        <Flex justify="flex-end">
          <SubmitBtn>确定</SubmitBtn>
        </Flex>
      </Form.Item>
    </Form>
  )
}

export default CreateFolderForm
