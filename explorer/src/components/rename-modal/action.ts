'use server'
import { rename } from '@/explorer-manager/src/main.mjs'

export type FieldType = {
  dir_path: string
  old_path: string
  new_path: string
}

export const renameAction: (form_data: FieldType) => Promise<{ status: 'ok' | 'error'; message: string }> = (
  form_data,
) => {
  const { dir_path, old_path, new_path } = form_data

  try {
    rename([dir_path, old_path].join('/'), [dir_path, new_path].join('/'))
    return Promise.resolve({ status: 'ok', message: 'done' })
  } catch (err: any) {
    return Promise.resolve({ status: 'error', message: JSON.stringify(err?.message) })
  }
}
