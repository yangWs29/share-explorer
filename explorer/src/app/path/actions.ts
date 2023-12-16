'use server'
import { deleteAction as sysDeleteAction } from '@/explorer-manager/src/main.mjs'

export type ActionResType = { message: string; status: 'error' | 'ok' | string }

export const deleteAction: (delete_item_path: string) => Promise<ActionResType> = async (delete_item_path: string) => {
  return sysDeleteAction(delete_item_path)
    .then(() => ({ message: '删除成功', status: 'ok' }))
    .catch(() => ({ message: '删除失败', status: 'error' }))
}
