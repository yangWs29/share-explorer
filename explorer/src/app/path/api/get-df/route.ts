import { NextRequest, NextResponse } from 'next/server'
import { findDfInfo } from '@/explorer-manager/src/df.mjs'

export const GET = async (req: NextRequest) => {
  const path = req.nextUrl.searchParams.get('path') || ''

  return NextResponse.json({ data: await findDfInfo(path) })
}
