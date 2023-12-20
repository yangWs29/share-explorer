// https://laysent.com/til/2019-12-02_7zip-bin-in-alpine-docker
// https://www.npmjs.com/package/node-7z
// https://www.7-zip.org/download.html
// import sevenBin from '7zip-bin'
import node7z from 'node-7z'
import path from 'path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { formatPath } from '../format-path.mjs'
import { parseFilePath } from '../parse-path.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @type {import('node-7z').SevenZipOptions}
 */
const base_option = {
  $bin: process.platform === 'darwin' ? path.join(__dirname, './mac/7zz') : path.join(__dirname, './linux/7zzs'),
  recursive: true,
  exclude: ['!__MACOSX/*', '!.DS_store'],
  latestTimeStamp: false,
}

/**
 * @param path {string}
 * @param out_path {string|undefined}
 * @param pwd {string | number | undefined}
 * @returns {import('node-7z').ZipStream}
 */
export const node7zaUnpackAction = (path, out_path = '', pwd = 'pwd') => {
  const join_path = formatPath(path)
  const { file_dir_path } = parseFilePath(join_path)

  return node7z.extractFull(join_path, formatPath(out_path) || `${file_dir_path}/`, {
    ...base_option,
    password: pwd,
  })
}

/**
 * @param path {string}
 * @param pwd {string | number | undefined}
 * @returns {import('node-7z').ZipStream}
 */
export const node7zListAction = (path, pwd = 'pwd') => {
  const join_path = formatPath(path)
  return node7z.list(join_path, { ...base_option, password: pwd })
}
