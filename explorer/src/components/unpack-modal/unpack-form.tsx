import React from 'react'
import { Button, Flex, Form, Input, Space } from 'antd'
import { useRequest } from 'ahooks'
import SelectPathInput from '@/components/select-path-input'
import { useUnpackPathStore } from '@/components/unpack-modal/unpack-path-context'
import { parseFilePath } from '@/explorer-manager/src/parse-path.mjs'

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

type FieldType = {
  path?: string
  pwd?: string
  out_path?: string
}

const UnpackForm: React.FC<{
  packList: ReturnType<typeof useRequest>
  unpack: ReturnType<typeof useRequest>
}> = ({ unpack, packList }) => {
  const [form] = Form.useForm()
  const unpack_path = useUnpackPathStore()
  const { file_dir_path } = parseFilePath(unpack_path)
  const out_path = `${file_dir_path}/`

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 2 }}
      initialValues={{ remember: true, path: unpack_path, out_path: out_path }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType> label="来源" name="path" rules={[{ required: true, message: '请输入来源' }]}>
        <Input disabled readOnly />
      </Form.Item>

      <SelectPathInput
        onSelect={(path) => {
          form.setFieldsValue({ out_path: '/' + path.join('/') + '/' })
        }}
      >
        <Form.Item<FieldType> label="目标" name="out_path" rules={[{ required: false, message: '请输入目标' }]}>
          <Input placeholder={`输出地址：${out_path}`} />
        </Form.Item>
      </SelectPathInput>

      <Form.Item<FieldType>
        label="密码"
        name="pwd"
        rules={[{ required: false, message: 'Please input your password!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Flex justify="flex-end">
          <Space>
            <Button onClick={() => packList.runAsync(form.validateFields())} loading={packList.loading}>
              查看列表
            </Button>
            <Button type="primary" onClick={() => unpack.runAsync(form.validateFields())} loading={unpack.loading}>
              解压缩
            </Button>
          </Space>
        </Flex>
      </Form.Item>
    </Form>
  )
}

export default UnpackForm
