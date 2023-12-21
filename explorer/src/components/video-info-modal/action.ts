'use server'
import { getVideoInfo } from '@/explorer-manager/src/ffmpeg/main.mjs'

export const getVideoInfoAction: typeof getVideoInfo = (path) => {
  return getVideoInfo(path)
}
