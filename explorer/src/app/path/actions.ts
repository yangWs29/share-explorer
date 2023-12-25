'use server'
import { deleteDir, readdir } from '@/explorer-manager/src/main.mjs'
import { ReaddirListType, ReaddirOptType } from '@/explorer-manager/src/type'
import { cookies } from 'next/headers'
import { SortType } from '@/components/readdir-sort/sort-context'
import { sortMap } from '@/components/readdir-sort/sort'

export type ActionResType = { message: string; status: 'error' | 'ok' | string }

export const deleteAction: (delete_item_path: string) => Promise<ActionResType> = async (delete_item_path: string) => {
  return deleteDir(delete_item_path)
    .then(() => ({ message: '删除成功', status: 'ok' }))
    .catch(() => ({ message: '删除失败', status: 'error' }))
}

export const readdirAction: (opt: ReaddirOptType) => Promise<ReaddirListType> = async (opt) => {
  const sort = (cookies().get('readdir-sort')?.value || 'asc_name') as SortType

  const { path, only_dir, only_file, has_file_stat } = opt

  return readdir(path, { only_dir, only_file, has_file_stat }).sort(sortMap[sort])
}
