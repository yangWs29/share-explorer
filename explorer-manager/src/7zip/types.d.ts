import { Data } from 'node-7z'
export { ZipStream, Data } from 'node-7z'

export type UnpackItemType = {
  title: string
  list: (Data & { loading: string; done: string })[]
  status: 'activity' | 'end' | 'err' | string
}
