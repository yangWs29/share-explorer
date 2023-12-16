import React from 'react'
import { App, Flex, Form, Input } from 'antd'
import { useRenameDispatch, useRenameStore } from '@/components/rename-modal/rename-context'
import { FieldType, renameAction } from '@/components/rename-modal/action'
import SubmitBtn from '@/components/submit-btn'
import { useUpdateReaddirList } from '@/app/path/readdir-context'

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const RenameForm: React.FC = () => {
  const [form] = Form.useForm()
  const { path: old_path, dir_path } = useRenameStore()
  const renameDispatch = useRenameDispatch()
  const { update } = useUpdateReaddirList()
  const { message: appMessage } = App.useApp()

  return (
    <Form
      form={form}
      labelCol={{ span: 2 }}
      initialValues={{ old_path: old_path, new_path: old_path, dir_path }}
      onFinish={(values) => {
        console.log('Success:', values)
        renameAction(values)
          .then(({ status, message }) => {
            if (status === 'error') {
              return Promise.reject({ status, message })
            }
            renameDispatch('')
            update()
            appMessage.success('重命名成功').then()
          })
          .catch(({ message }) => {
            appMessage.error(`重命名失败: ${message}`).then()
          })
      }}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType> name="dir_path" hidden={true}>
        <Input disabled readOnly />
      </Form.Item>

      <Form.Item<FieldType> label="名称" name="old_path" rules={[{ required: true, message: '请输入旧名称' }]}>
        <Input disabled readOnly />
      </Form.Item>

      <Form.Item<FieldType> label="新名称" name="new_path" rules={[{ required: true, message: '请输入新名称' }]}>
        <Input placeholder={`移动位置`} />
      </Form.Item>

      <Form.Item>
        <Flex justify="flex-end">
          <SubmitBtn>确定</SubmitBtn>
        </Flex>
      </Form.Item>
    </Form>
  )
}

export default RenameForm
