'use server'
import { createVideoPreviewImg, getVideoInfo } from '@/explorer-manager/src/ffmpeg/main.mjs'

export const getVideoInfoAction: typeof getVideoInfo = (path) => {
  return getVideoInfo(path)
}

export const createVideoPreviewAction: typeof createVideoPreviewImg = async (path) => {
  return await createVideoPreviewImg(path)
}
