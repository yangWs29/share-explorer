import { NextRequest, NextResponse } from 'next/server'
import { readdir } from '@/explorer-manager/src/main.mjs'

export type SearchParamsType = {
  path: string
  only_dir: '0' | '1'
  only_file: '0' | '1'
  has_file_stat: '0' | '1'
}

export const GET = async (req: NextRequest) => {
  const { path, only_dir, only_file, has_file_stat } = Object.fromEntries(req.nextUrl.searchParams) as SearchParamsType

  return NextResponse.json({ readdir: readdir(path, { only_dir, only_file, has_file_stat }) })
}
