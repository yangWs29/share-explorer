export const pathExp = /(^\/)?path/

export const encodePathItem = (path: string) => {
  return path
    .split('/')
    .map((text) => encodeURIComponent(text))
    .join('/')
}
