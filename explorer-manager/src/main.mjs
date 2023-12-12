import fs from 'fs'
import { formatPath } from './format-path.mjs'

const checkIsHideExp = /^\./

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
