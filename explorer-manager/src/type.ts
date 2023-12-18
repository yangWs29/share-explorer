import { Stats } from 'fs'

export type ReaddirItemType = { is_directory: boolean; name: string; stat?: Stats }

export type ReaddirListType = ReaddirItemType[]

export type DfResItemType = {
  filesystem: string
  size: number
  used: number
  available: number
  capacity: number
  mount: string
}

export type DfOptType = Partial<{
  file: string
  prefixMultiplier: 'KiB|MiB|GiB|TiB|PiB|EiB|ZiB|YiB|MB|GB|TB|PB|EB|ZB|YB'
  isDisplayPrefixMultiplier: boolean
  precision: number
}>
