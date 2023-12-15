import { usePathname } from 'next/navigation'

export const pathExp = /(^\/)?path/

export const encodePathItem = (path: string) => {
  return path
    .split('/')
    .map((text) => encodeURIComponent(text))
    .join('/')
}

export const useReplacePathname = () => {
  const pathname = decodeURIComponent(usePathname() || '')
  const replace_pathname = pathname.replace(pathExp, '')

  const joinSearchPath = (path: string) => encodePathItem(`${replace_pathname}/${path}`)
  const joinPath = (path: string) => encodePathItem(`${pathname}/${path}`)
  const staticPath = (path: string) => `/static${joinSearchPath(path)}`

  return {
    pathname: pathname,
    replace_pathname: replace_pathname,
    joinSearchPath: joinSearchPath,
    joinPath: joinPath,
    staticPath: staticPath,
  }
}
