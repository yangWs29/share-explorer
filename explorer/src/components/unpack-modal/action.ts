'use server'
import { node7zListAction } from '@/explorer-manager/src/7zip/7zip.mjs'
import { Data } from '@/explorer-manager/src/7zip/types'

export type ActionResType = { data?: Data[]; status: 'error' | 'ok' | string; message?: string }

export const unpackListAction: (path: string, pwd?: string) => Promise<ActionResType> = (path, pwd) => {
  return new Promise((res, rej) => {
    const stream = node7zListAction(path, pwd)
    const unpack_list: Data[] = []

    stream.on('data', (item: any) => {
      unpack_list.push(item)
    })

    stream.on('end', () => {
      res({ data: unpack_list, status: 'ok' })
    })

    stream.on('error', (err: { stderr: string }) => {
      console.log(err)
      res({ data: [], status: 'error', message: err.stderr })
    })
  })
}
