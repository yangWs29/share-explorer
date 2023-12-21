import ff_probe from 'ffprobe'
import { formatPath } from '../format-path.mjs'
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
