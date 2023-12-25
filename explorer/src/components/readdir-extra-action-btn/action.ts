'use server'
import { createFile, createFolder } from '@/explorer-manager/src/main.mjs'
import { ActionResType } from '@/app/path/actions'

export const createFolderAction: (folder_path: string) => Promise<ActionResType> = (folder_path) => {
  try {
    createFolder(folder_path)
    return Promise.resolve({ status: 'ok', message: 'done' })
  } catch (err: any) {
    return Promise.resolve({ status: 'error', message: JSON.stringify(err?.message) })
  }
}

export const createFileAction: (file_path: string) => Promise<ActionResType> = (file_path) => {
  try {
    createFile(file_path)
    return Promise.resolve({ status: 'ok', message: 'done' })
  } catch (err: any) {
    return Promise.resolve({ status: 'error', message: JSON.stringify(err?.message) })
  }
}
