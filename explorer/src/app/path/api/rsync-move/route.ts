import { NextRequest, NextResponse } from 'next/server'
import { rsyncMovePath } from '@/explorer-manager/src/rsync/index.mjs'

export const POST = async (req: NextRequest) => {
  const { path, out_path, rsync_delete_source, test } = await req.json()

  try {
    const stream = rsyncMovePath(path, out_path, rsync_delete_source, test)

    return new NextResponse(stream.stdout, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    })
  } catch (e: any) {
    return NextResponse.json({ err_msg: e.message }, { status: 500 })
  }
}
