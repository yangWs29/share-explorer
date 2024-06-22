import { useInlinePathname } from '@/components/desktop/inline-path-context'

export const pathExp = /(^\/)?path/

export const encodePathItem = (path: string) => {
  return path
    .split('/')
    .filter(Boolean)
    .map((text) => encodeURIComponent(text))
    .join('/')
}

export const staticPath = (path: string) => `/static/${encodePathItem(path)}`
export const explorerPath = (path: string) => `/path/${encodePathItem(path)}`
export const replacePath = (path: string) => path.replace(pathExp, '')

export const useReplacePathname = () => {
  const pathname = decodeURIComponent(useInlinePathname().pathname || '')
  const replace_pathname = pathname.replace(pathExp, '')

  const joinSearchPath = (path: string) => encodePathItem(`${replace_pathname}/${path}`)
  const joinPath = (path: string) => encodePathItem(`${pathname}/${path}`)

  return {
    pathname: pathname,
    replace_pathname: replace_pathname,
    joinSearchPath: joinSearchPath,
    joinPath: joinPath,
    staticPath: staticPath,
  }
}
