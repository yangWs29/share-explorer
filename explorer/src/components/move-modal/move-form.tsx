import React from 'react'
import { App, Flex, Form, Input, Space } from 'antd'
import SelectPathInput from '@/components/select-path-input'
import { useMovePathDispatch, useMovePathStore } from '@/components/move-modal/move-path-context'
import { moveAction } from '@/components/move-modal/action'
import SubmitBtn from '@/components/submit-btn'
import { useUpdateReaddirList } from '@/app/path/readdir-context'
import { parseDirPath } from '@/explorer-manager/src/parse-path.mjs'

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

type FieldType = {
  path?: string
  new_path?: string
  last?: string
}

const MoveForm: React.FC = () => {
  const [form] = Form.useForm()
  const move_path = useMovePathStore()
  const { message } = App.useApp()
  const changeMovePath = useMovePathDispatch()
  const { update } = useUpdateReaddirList()
  const { last, remain } = parseDirPath(move_path)

  return (
    <Form
      form={form}
      labelCol={{ span: 3 }}
      initialValues={{ remember: true, path: move_path, new_path: remain, last: last }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType> label="来源" name="path" rules={[{ required: true, message: '请输入来源' }]}>
        <Input disabled readOnly />
      </Form.Item>

      <SelectPathInput
        onSelect={(path) => {
          form.setFieldsValue({ new_path: '/' + path.join('/') + '/' })
        }}
        highlight_path={move_path}
      >
        <Form.Item<FieldType>
          label="新位置"
          name="new_path"
          rules={[{ required: true, message: '请输入移动置目录' }]}
          style={{ width: '100%' }}
        >
          <Input placeholder={`移动目录`} />
        </Form.Item>
      </SelectPathInput>

      <Form.Item<FieldType> label="名称" name="last" rules={[{ required: true, message: '请输入名称' }]}>
        <Input placeholder={`名称`} />
      </Form.Item>

      <Form.Item>
        <Flex justify="flex-end">
          <Space>
            <SubmitBtn
              onClick={async () => {
                const { path, new_path, last } = await form.validateFields()

                return moveAction(path, [new_path, last].join('/')).then(() => {
                  changeMovePath('')
                  update()
                  message.success('移动成功').then()
                })
              }}
            >
              移动
            </SubmitBtn>
          </Space>
        </Flex>
      </Form.Item>
    </Form>
  )
}

export default MoveForm
