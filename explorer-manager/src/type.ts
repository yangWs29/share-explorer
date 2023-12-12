import { Stats } from 'fs'

export type ReaddirItemType = { is_directory: boolean; name: string; stat?: Stats }

export type ReaddirListType = ReaddirItemType[]
