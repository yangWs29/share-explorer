'use client'
import React from 'react'
import { App, Form, FormInstance, Input } from 'antd'
import { createFileAction } from '@/components/readdir-extra-action-btn/action'
import { useUpdateReaddirList } from '@/app/path/readdir-context'
import { useReplacePathname } from '@/components/use-replace-pathname'

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

export const useCreateFile = () => {
  const [form] = Form.useForm()
  const { update } = useUpdateReaddirList()
  const { message: appMessage } = App.useApp()
  const { replace_pathname } = useReplacePathname()

  return {
    createFileFormContent: <CreateFileForm form={form} />,
    createFileForm: form,
    createFile: async () => {
      return form.validateFields().then((values) => {
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
      })
    },
  }
}

const CreateFileForm: React.FC<{ form?: FormInstance }> = ({ form }) => {
  return (
    <Form
      form={form}
      labelCol={{ span: 2 }}
      initialValues={{ file_name: '新建文件.txt' }}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item name="file_name" rules={[{ required: true, message: '请输入文名称' }]}>
        <Input />
      </Form.Item>
    </Form>
  )
}

export default CreateFileForm
