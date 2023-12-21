import ff_probe from 'ffprobe'
import { formatPath, resetPath } from '../format-path.mjs'
import { createVideoPreview } from './create-video-preview.mjs'
// npm install ffprobe-static
// import ff_probe_static from 'ffprobe-static'

/**
 * @param {string} path
 * @returns {Promise<import('ffprobe').FFProbeResult>}
 */
export const getVideoInfo = (path = '') => {
  return ff_probe(formatPath(path), {
    path: 'ffprobe',
  }).catch((err) => {
    console.log({ err })
  })
}

/**
 *
 * @param {string} video_path
 * @returns {Promise<string>}
 */
export const createVideoPreviewImg = (video_path) => {
  const join_video_path = formatPath(video_path)
  const stream = createVideoPreview(join_video_path)

  return new Promise((res, rej) => {
    stream.stdout.on('data', (data) => console.log(data.toString()))

    stream.stdout.on('end', () => {
      const done_path = `${resetPath(join_video_path)}.webp`
      console.log('create preview done', done_path)

      res({ video_preview_path: done_path })
    })

    stream.stdout.on('error', rej)
  })
}
