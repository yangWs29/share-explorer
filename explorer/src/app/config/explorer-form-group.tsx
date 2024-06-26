'use client'
import React from 'react'
import { EXPLORER_TYPE } from '@/config-manager/typs'
import { map } from 'lodash'
import { Card, Form, Input } from 'antd'

const explorer_form: EXPLORER_TYPE = {
  open_file_exp: {
    img: '',
    raw: '',
    gif: '',
    zip: '',
    video: '',
    text: '',
  },
}

const ExplorerFormGroup: React.FC = () => {
  return map(explorer_form, (item_1, key_1) => {
    return (
      <Card title={key_1} key={key_1}>
        {map(item_1, (item_2, key_2) => {
          return (
            <Form.Item label={key_2} name={['explorer', key_1, key_2]} initialValue={item_2} key={key_2}>
              <Input />
            </Form.Item>
          )
        })}
      </Card>
    )
  })
}

export default ExplorerFormGroup
