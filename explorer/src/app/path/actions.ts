'use server'
import { deleteDir, readdir } from '@/explorer-manager/src/main.mjs'
import { ReaddirListType, ReaddirOptType } from '@/explorer-manager/src/type'

export type ActionResType = { message: string; status: 'error' | 'ok' | string }

export const deleteAction: (delete_item_path: string) => Promise<ActionResType> = async (delete_item_path: string) => {
  return deleteDir(delete_item_path)
    .then(() => ({ message: '删除成功', status: 'ok' }))
    .catch(() => ({ message: '删除失败', status: 'error' }))
}

export const readdirAction: (opt: ReaddirOptType) => Promise<ReaddirListType> = (opt) => {
  const { path, only_dir, only_file, has_file_stat } = opt

  return new Promise((res, rej) => {
    try {
      res(readdir(path, { only_dir, only_file, has_file_stat }))
    } catch (e) {
      rej(e)
    }
  })
}
