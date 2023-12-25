'use server'
import { getFolderSizeLoose } from '@/explorer-manager/src/main.mjs'

export const getFolderSizeAction = (path: string) => {
  return getFolderSizeLoose(path)
}
