import { Stats } from 'fs'

export type ReaddirOptType = {
  path: string
  only_dir?: '0' | '1'
  only_file?: '0' | '1'
  show_hide?: '0' | '1'
  has_file_stat?: '0' | '1'
}

export type ReaddirItemType = { is_directory: boolean; name: string; file_path: string; stat?: Stats }

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
