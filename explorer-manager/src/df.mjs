import df from 'node-df'
import { formatPath } from './format-path.mjs'

/**
 *
 * @param {import('./type').DfOptType} opt
 * @returns {Promise<import('./type').DfResItemType[]>}
 */
export const getDF = async (opt = {}) => {
  return new Promise((res, rej) => {
    df(opt, (error, response) => {
      if (error) {
        rej(error)
      }

      res(response)
    })
  })
}

/**
 *
 * @param path
 * @returns {Promise<import('./type').DfResItemType>}
 */
export const findDfInfo = async (path = '') => {
  const info = await getDF()
  const join_path = formatPath(path)

  return info
    .filter((item) => {
      return join_path.includes(item.mount)
    })
    .pop()
}
