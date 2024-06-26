'use client'
import React from 'react'
import { map } from 'lodash'
import { Card, Form, Input } from 'antd'

const q_bittorrent_form = {
  base: { host: '', username: '', password: '' },
}

type ItemType = {
  title: string
  key: string
  children: ItemType[]
}

const RenderFormItem: React.FC<{ item: ItemType }> = ({ item }) => {
  return (
    <Card title={item.title}>
      {map(item.children, (item) => (
        <RenderFormItem item={item} key={item.title} />
      ))}
    </Card>
  )
}

const QBittorrentFormGroup: React.FC = () => {
  return map(q_bittorrent_form, (item_1, key_1) => {
    return (
      <Card title={key_1} key={key_1}>
        {map(item_1, (item_2, key_2) => {
          return (
            <Form.Item label={key_2} name={['q_bittorrent', key_1, key_2]} initialValue={item_2} key={key_2}>
              <Input />
            </Form.Item>
          )
        })}
      </Card>
    )
  })
}

export default QBittorrentFormGroup
