'use client'
import React, { useState } from 'react'
import { Card, Modal, Space, Table } from 'antd'
import UnpackForm from '@/components/unpack-modal/unpack-form'
import { isEmpty } from 'lodash'
import { useRequest } from 'ahooks'
import Bit from '@/components/bit'
import DateFormat from '@/components/date-format'
import { UnpackItemType } from '@/explorer-manager/src/7zip/types'
import { useUnpackPathDispatch, useUnpackPathStore } from '@/components/unpack-modal/unpack-path-context'
import { useUpdateReaddirList } from '@/app/path/readdir-context'
import { unpackListAction } from '@/components/unpack-modal/action'

let pack_list_path = ''

const UnpackModal: React.FC = () => {
  const unpack_path = useUnpackPathStore()
  const changeUnpackPath = useUnpackPathDispatch()
  const [unpack_list, changeUnpackList] = useState<UnpackItemType['list']>([])
  const { update } = useUpdateReaddirList()

  const packList = useRequest(
    async (form_val) => {
      pack_list_path = unpack_path
      const { pwd } = await form_val

      return unpackListAction(unpack_path, pwd)
    },
    {
      manual: true,
    },
  )

  const unpack = useRequest(
    async (form_val) => {
      pack_list_path = unpack_path
      unpack_list.length = 0
      const { out_path, pwd } = await form_val
      const res = await fetch('/path/api/unpack', {
        method: 'post',
        body: JSON.stringify({ path: unpack_path, out_path, pwd: pwd }),
      })

      if (res.body) {
        const reader = res.body.getReader()
        const decode = new TextDecoder()

        while (1) {
          const { done, value } = await reader.read()

          const decode_value = decode
            .decode(value)
            .split(', ')
            .filter((text) => Boolean(String(text).trim()))
            .map((value) => {
              try {
                return value ? JSON.parse(value) : { value }
              } catch (e) {
                return { value }
              }
            })
            .filter((item) => !item.loading)
            .reverse()

          !isEmpty(decode_value) && changeUnpackList((unpack_list) => decode_value.concat(unpack_list))

          if (done) {
            break
          }
        }
      }

      return Promise.resolve().then(update)
    },
    {
      manual: true,
    },
  )

  return (
    <Modal
      title="解压缩"
      open={!isEmpty(unpack_path)}
      width="75%"
      onCancel={() => changeUnpackPath('')}
      footer={false}
      destroyOnClose={true}
    >
      <UnpackForm packList={packList} unpack={unpack} />

      <Space direction="vertical" style={{ width: '100%' }}>
        {pack_list_path === unpack_path && !isEmpty(unpack_list) && (
          <Card
            title="unpack"
            bodyStyle={{
              maxHeight: '300px',
              overflowY: 'scroll',
              paddingTop: 20,
              overscrollBehavior: 'contain',
            }}
          >
            {unpack_list.map(({ file, done }) => (
              <pre key={file || done}>{file || done}</pre>
            ))}
          </Card>
        )}

        {pack_list_path === unpack_path && !isEmpty(packList.data) && (
          <Card title="压缩包内容">
            {!isEmpty(packList.data?.data) && (
              <Table
                scroll={{ x: true }}
                rowKey={({ file }) => file}
                columns={[
                  { key: 'file', dataIndex: 'file', title: 'file' },
                  {
                    key: 'size',
                    dataIndex: 'size',
                    title: 'size',
                    width: 100,
                    render: (size) => {
                      return <Bit>{size}</Bit>
                    },
                  },
                  {
                    key: 'sizeCompressed',
                    dataIndex: 'sizeCompressed',
                    title: 'sizeCompressed',
                    width: 150,
                    render: (size) => {
                      return <Bit>{size}</Bit>
                    },
                  },
                  {
                    key: 'datetime',
                    dataIndex: 'datetime',
                    title: 'datetime',
                    width: 180,
                    render: (date) => <DateFormat>{new Date(date).getTime()}</DateFormat>,
                  },
                ]}
                dataSource={packList.data?.data}
              />
            )}
            {packList.data?.message && <p>{packList.data?.message}</p>}
          </Card>
        )}
      </Space>
    </Modal>
  )
}

export default UnpackModal
