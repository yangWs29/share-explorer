import { ReaddirItemType } from '@/explorer-manager/src/type'
import naturalCompare from 'natural-compare-lite'

export type SortAction = (a: ReaddirItemType, b: ReaddirItemType) => number
export const nameAscSort: SortAction = (a, b) => naturalCompare(a.name, b.name)
export const dateAscSort: SortAction = (a, b) => (a?.stat?.mtimeMs || 0) - (b?.stat?.mtimeMs || 0)
export const nameDescSort: SortAction = (a, b) => naturalCompare(b.name, a.name)
export const dateDescSort: SortAction = (a, b) => (b?.stat?.mtimeMs || 0) - (a?.stat?.mtimeMs || 0)
export const sortMap = {
  asc_name: nameAscSort,
  asc_date: dateAscSort,
  desc_name: nameDescSort,
  desc_date: dateDescSort,
}
