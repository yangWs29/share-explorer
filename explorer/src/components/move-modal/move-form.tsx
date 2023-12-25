import React from 'react'
import { Flex, Form, Input, Select, Space, Switch } from 'antd'
import SelectPathInput from '@/components/select-path-input'
import { useMovePathStore } from '@/components/move-modal/move-path-context'
import SubmitBtn from '@/components/submit-btn'
import { parseDirPath } from '@/explorer-manager/src/parse-path.mjs'

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

export type FieldType = {
  path: string
  new_path: string
  last: string
  move_type: 'move' | 'rsync'
  rsync_delete_source: boolean
  test: boolean
}

const options = [
  { label: '移动', value: 'move' },
  { label: 'rsync 同步', value: 'rsync' },
]

const MoveForm: React.FC<{ onFinish: (values: FieldType) => void }> = ({ onFinish }) => {
  const [form] = Form.useForm()
  const move_path = useMovePathStore()
  const { last, remain } = parseDirPath(move_path)

  const move_type = Form.useWatch('move_type', { form, preserve: true })

  return (
    <Form<FieldType>
      form={form}
      labelCol={{ span: 4 }}
      initialValues={{
        remember: true,
        path: move_path,
        new_path: remain,
        last: last,
        move_type: 'move',
        rsync_delete_source: false,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType> label="移动方式" name="move_type" rules={[{ required: true, message: '请选择移动方式' }]}>
        <Select options={options} />
      </Form.Item>
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

      {move_type === 'rsync' && (
        <Form.Item<FieldType> label="删除源文件" name="rsync_delete_source">
          <Switch />
        </Form.Item>
      )}

      {move_type === 'rsync' && (
        <Form.Item<FieldType> label="测试" name="test">
          <Switch />
        </Form.Item>
      )}

      <Form.Item>
        <Flex justify="flex-end">
          <Space>
            <SubmitBtn>{options.filter((item) => item.value === move_type).pop()?.label}</SubmitBtn>
          </Space>
        </Flex>
      </Form.Item>
    </Form>
  )
}

export default MoveForm
