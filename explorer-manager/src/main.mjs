import fs from 'fs'
import { fileTypeFromFile } from 'file-type'
import { formatPath } from './format-path.mjs'
import extName from 'ext-name'

const checkIsHideExp = /^\./

//https://github.com/vercel/next.js/discussions/15453#discussioncomment-6565699
/**
 * Took this syntax from https://github.com/MattMorgis/async-stream-generator
 * Didn't find proper documentation: how come you can iterate on a Node.js ReadableStream via "of" operator?
 * What's "for await"?
 */
export const nodeStreamToIterator = async function* (stream) {
  for await (const chunk of stream) {
    yield chunk
  }
}

/**
 * Taken from Next.js doc
 * https://nextjs.org/docs/app/building-your-application/routing/router-handlers#streaming
 * Itself taken from mozilla doc
 * https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
 * @param iterator {any}
 * @returns {ReadableStream<any>}
 */
export const iteratorToStream = (iterator) => {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next()

      if (done) {
        controller.close()
      } else {
        // conversion to Uint8Array is important here otherwise the stream is not readable
        // @see https://github.com/vercel/next.js/issues/38736
        controller.enqueue(value)
      }
    },
  })
}

/**
 * @param path {string}
 * @param only_dir {only_dir:'0'|'1'}
 * @param only_file {only_file:'0'|'1'}
 * @param show_hide {show_hide:'0'|'1'}
 * @param has_file_stat {has_file_stat:'0'|'1'}
 * @returns {import('./type').ReaddirListType}
 */
export const readdir = (path = '.', { only_dir = '0', only_file = '0', show_hide = '0', has_file_stat = '0' } = {}) => {
  return fs.readdirSync(formatPath(path), { withFileTypes: true }).reduce((dir_list, Dirent) => {
    const is_directory = !Dirent.isFile()
    const name = Dirent.name
    let stat = {}

    if (has_file_stat === '1') {
      stat = fs.statSync(formatPath(path, name))
    }

    if (show_hide === '0' && checkIsHideExp.test(name)) {
      return dir_list
    }

    if (only_dir === '1' && !is_directory) {
      return dir_list
    }

    if (only_file === '1') {
      if (is_directory) {
        return dir_list
      } else if (has_file_stat !== '1') {
        stat = fs.statSync(formatPath(path, name))
      }
    }

    dir_list.push({
      name,
      is_directory,
      stat: { ...stat },
    })

    return dir_list
  }, [])
}

export const getFileDetail = async (path = '') => {
  const file_path = formatPath(path)
  return await fileTypeFromFile(formatPath(path)).then((info) => {
    if (info) {
      return info
    } else {
      return extName(file_path)
    }
  })
}

export const fsStat = (path) => {
  return fs.statSync(formatPath(path))
}

/**
 * @param path {string}
 * @param option {StreamOptions}
 * @returns {ReadableStream<*>|Buffer}
 */
export const fsStream = (path = '.', option = {}) => {
  if (fs.statSync(formatPath(path)).isFile()) {
    return iteratorToStream(nodeStreamToIterator(fs.createReadStream(formatPath(path), option)))
  } else {
    return Buffer.from('')
  }
}
