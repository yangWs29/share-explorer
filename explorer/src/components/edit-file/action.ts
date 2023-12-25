'use server'
import { getFileContent, writeFile } from '@/explorer-manager/src/main.mjs'

export const getEditFileContentAction: (path: string) => Promise<string> = (path) => {
  return new Promise((res, rej) => {
    try {
      res(getFileContent(path))
    } catch (e) {
      rej(e)
    }
  })
}

export const writeFileAction: (path: string, content: string) => Promise<string> = (path, content) => {
  return new Promise((res, rej) => {
    try {
      writeFile(path, content)
      res('done')
    } catch (e) {
      rej(e)
    }
  })
}
