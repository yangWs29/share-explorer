import { NextRequest, NextResponse } from 'next/server'
import { getFolderSizeAction } from '@/explorer-manager/src/main.mjs'

export type ResType = { data: number }

export const GET = async (req: NextRequest) => {
  const size = await getFolderSizeAction(req.nextUrl.searchParams.get('path'))

  return NextResponse.json<ResType>({ data: size })
}
