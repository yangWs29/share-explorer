'use client'
import React from 'react'
import { App, Form, FormInstance, Input } from 'antd'
import { createFolderAction } from '@/components/readdir-extra-action-btn/action'
import { useUpdateReaddirList } from '@/app/path/readdir-context'
import { useReplacePathname } from '@/components/use-replace-pathname'

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

export const useCreateFolderForm = () => {
  const [form] = Form.useForm()
  const { update } = useUpdateReaddirList()
  const { message: appMessage } = App.useApp()
  const { replace_pathname } = useReplacePathname()

  return {
    createFolderFormContent: <CreateFolderForm form={form} />,
    createFolderForm: form,
    createFolder: async () => {
      return form.validateFields().then((values) => {
        const { dir_name } = values

        createFolderAction([replace_pathname, dir_name].join('/'))
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
      })
    },
  }
}

const CreateFolderForm: React.FC<{ form?: FormInstance }> = ({ form }) => {
  return (
    <Form form={form} labelCol={{ span: 2 }} initialValues={{ dir_name: '新建文件夹' }} onFinishFailed={onFinishFailed}>
      <Form.Item name="dir_name" rules={[{ required: true, message: '请输入文件夹名称' }]}>
        <Input />
      </Form.Item>
    </Form>
  )
}

export default CreateFolderForm
