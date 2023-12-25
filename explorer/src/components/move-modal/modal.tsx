'use client'
import React, { useState } from 'react'
import { App, Card, Modal } from 'antd'
import { isEmpty } from 'lodash'
import MoveForm, { FieldType } from '@/components/move-modal/move-form'
import { useMovePathDispatch, useMovePathStore } from '@/components/move-modal/move-path-context'
import { useRequest } from 'ahooks'
import { useUpdateReaddirList } from '@/app/path/readdir-context'
import { moveAction } from '@/components/move-modal/action'

const MoveModal: React.FC = () => {
  const move_path = useMovePathStore()
  const changeMovePath = useMovePathDispatch()
  const [chunk, changeChunk] = useState<string[]>([])
  const { update } = useUpdateReaddirList()
  const { message } = App.useApp()

  const rsyncMove = useRequest(
    async (values: FieldType) => {
      const { path, new_path, last, rsync_delete_source } = values

      const res = await fetch('/path/api/rsync-move', {
        method: 'post',
        body: JSON.stringify({
          path: path,
          out_path: [new_path, last].join('/'),
          rsync_delete_source: rsync_delete_source,
        }),
      })

      if (res.body) {
        const reader = res.body.getReader()
        const decode = new TextDecoder()

        while (1) {
          const { done, value } = await reader.read()

          const decode_value = decode.decode(value)

          !isEmpty(decode_value) && changeChunk((chunk) => chunk.concat(decode_value).reverse())

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
      title="移动"
      open={!isEmpty(move_path)}
      width="75%"
      onCancel={() => changeMovePath('')}
      footer={false}
      destroyOnClose={true}
    >
      <MoveForm
        onFinish={(values) => {
          const { move_type, path, new_path, last } = values

          const thenAction = () => {
            changeMovePath('')
            update()
            message.success('移动成功').then()
          }

          if (move_type === 'move') {
            return moveAction(path, [new_path, last].join('/')).then(thenAction)
          } else if (move_type === 'rsync') {
            rsyncMove.run(values)
          }
        }}
      />

      {!isEmpty(chunk) && (
        <Card
          bodyStyle={{
            maxHeight: '300px',
            overflowY: 'scroll',
            paddingTop: 20,
            overscrollBehavior: 'contain',
          }}
        >
          <pre>{chunk.join('')}</pre>
        </Card>
      )}
    </Modal>
  )
}

export default MoveModal
