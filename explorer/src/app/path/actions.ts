'use server'
import { deleteDir, readdir } from '@/explorer-manager/src/main.mjs'
import { ReaddirListType, ReaddirOptType } from '@/explorer-manager/src/type'
import { cookies } from 'next/headers'
import { SortType } from '@/components/readdir-sort/sort-context'
import { sortMap } from '@/components/readdir-sort/sort'
import { revalidatePath } from 'next/cache'
import { card_column_cookie_key, display_type_cookie_key } from '@/app/path/conf'

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

export const setCardColumnCookie = async (column: number) => {
  cookies().set(card_column_cookie_key, String(column))

  revalidatePath('/path')
}

export const setDisplayTypeCookie = async (display_type: string) => {
  cookies().set(display_type_cookie_key, display_type)

  revalidatePath('/path')
}
