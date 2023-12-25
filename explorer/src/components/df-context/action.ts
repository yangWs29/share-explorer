'use server'
import { findDfInfo } from '@/explorer-manager/src/df.mjs'
import { DfResItemType } from '@/explorer-manager/src/type'

export const findDfInfoAction: (path: string) => Promise<DfResItemType | null> = async (path) => {
  return new Promise(async (res, rej) => {
    try {
      const info = await findDfInfo(path)
      res(info)
    } catch (e) {
      rej(e)
    }
  })
}
