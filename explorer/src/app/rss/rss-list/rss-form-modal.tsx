'use client'
import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { BetaSchemaForm } from '@ant-design/pro-components'
import { addRSSAction, getRSSAction } from '@/app/rss/rss-list/actions'
import { useRSSList } from '@/app/rss/rss-list/rss-context'
import { useGetFormSchema } from '@/app/rss/rss-list/use-get-form-schema'
import { RSSItemType } from '@/rss-parse/src/types'

type RSSFormModalType = { trigger?: React.JSX.Element } & { item?: RSSItemType }
const RSSFormModal: React.FC<RSSFormModalType> = ({ trigger, item }) => {
  const { update } = useRSSList()
  const { getFormSchema } = useGetFormSchema()

  return (
    <BetaSchemaForm<RSSItemType>
      trigger={trigger || <Button icon={<PlusOutlined />}>添加 RSS</Button>}
      layoutType="ModalForm"
      request={async () => getRSSAction(item?.key)}
      // modalProps={{ destroyOnClose: true }}
      preserve={false}
      grid={true}
      colProps={{
        span: 12,
      }}
      onFinish={async (values) => {
        const { key, ...other_value } = values

        return addRSSAction(key, other_value).then((status) => update().then(() => status))
      }}
      columns={getFormSchema()}
    />
  )
}

export default RSSFormModal
