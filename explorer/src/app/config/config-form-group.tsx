'use client'
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'antd'
import ExplorerFormGroup from '@/app/config/explorer-form-group'
import { APP_CONFIG_TYPE } from '@/config-manager/typs'
import { saveConfigAction } from '@/config-manager/actions'
import QBittorrentFormGroup from '@/app/config/q-bittorrent-form-group'
import { merge } from 'lodash'

const ConfigFormGroup: React.FC<{ config: APP_CONFIG_TYPE }> = ({ config }) => {
  const [form] = Form.useForm()
  const [active_tab_key, setActiveTabKey] = useState<string>('explorer')

  useEffect(() => {
    form.setFieldsValue(config)
  }, [config])

  return (
    <Card
      activeTabKey={active_tab_key}
      onTabChange={setActiveTabKey}
      actions={[
        <Button
          key={1}
          onClick={() => {
            form.submit()
          }}
        >
          保存
        </Button>,
      ]}
      tabList={[
        {
          key: 'explorer',
          label: 'explorer',
        },
        {
          key: 'q-bittorrent',
          label: 'q-bittorrent',
        },
        {
          key: 'rss',
          label: 'rss',
        },
      ]}
    >
      <Form
        form={form}
        onFinish={(values) => {
          console.log(values)
          return saveConfigAction(merge(config, values))
        }}
      >
        {active_tab_key === 'explorer' && <ExplorerFormGroup />}
        {active_tab_key === 'q-bittorrent' && <QBittorrentFormGroup />}
      </Form>
    </Card>
  )
}

export default ConfigFormGroup
