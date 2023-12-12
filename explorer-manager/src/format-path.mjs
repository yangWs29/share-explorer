import sys_path from 'path'

export const BASE_EXPLORER_PATH = process.env.EXPLORER_PATH || process.env.HOME

export const formatPath = (...path) => {
  return sys_path
    .join(BASE_EXPLORER_PATH, ...path)
    .split('/')
    .map((text) => {
      try {
        return decodeURIComponent(text)
      } catch (e) {
        return text
      }
    })
    .join('/')
}

export const resetPath = (path) => {
  return path.replace(BASE_EXPLORER_PATH, '')
}
