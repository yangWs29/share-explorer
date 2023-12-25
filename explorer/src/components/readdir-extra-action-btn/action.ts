'use server'
import { createFileAction, createFolderAction } from '@/explorer-manager/src/main.mjs'
import { ActionResType } from '@/app/path/actions'

export const createFolder: (folder_path: string) => Promise<ActionResType> = (folder_path) => {
  try {
    createFolderAction(folder_path)
    return Promise.resolve({ status: 'ok', message: 'done' })
  } catch (err: any) {
    return Promise.resolve({ status: 'error', message: JSON.stringify(err?.message) })
  }
}

export const createFile: (file_path: string) => Promise<ActionResType> = (file_path) => {
  try {
    createFileAction(file_path)
    return Promise.resolve({ status: 'ok', message: 'done' })
  } catch (err: any) {
    return Promise.resolve({ status: 'error', message: JSON.stringify(err?.message) })
  }
}
