export const parseFilePath = (path = '') => {
  const path_arr = path.split('/')
  const file_dir_path = path_arr.slice(0, -1).join('/')
  const file_name = path_arr.pop()
  const dir_name = file_name.split('.').slice(0, -1).join('')

  return { file_dir_path, file_name, dir_name }
}

export const parseDirPath = (path = '') => {
  const path_arr = path.split('/').filter(Boolean)

  const last = path_arr.pop() || ''
  const remain = '/' + path_arr.join('/')

  return {
    last,
    remain,
  }
}
