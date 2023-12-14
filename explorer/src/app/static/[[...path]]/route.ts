import { NextRequest, NextResponse } from 'next/server'
import { fsStat, fsStream, getFileDetail } from '@/explorer-manager/src/main.mjs'
import etag from 'etag'
import { extend } from 'lodash'
import sys_path from 'path'

export const GET = async (req: NextRequest, { params: { path } }: { params: { path: string[] } }) => {
  const static_path = '/' + path.join('/')
  const file_type = await getFileDetail(static_path)
  const filename = sys_path.basename(static_path)
  const stat = fsStat(static_path)

  const headers = {
    'Content-Type': file_type.mime,
    'Content-Disposition': `filename=${encodeURIComponent(filename || 'download')}`,
    'Cache-Control': `public,max-age=${60 * 60 * 24 * 30 * 6},must-revalidate`,
    'Content-Length': stat.size.toString(),
    ETag: etag(Date.now().toString()),
    'Last-Modified': stat.mtime.toString(),
  }

  const option: { start?: number; end?: number } = {}

  const range = req.headers.get('Range') || '' //如果是video标签发起的请求就不会为null

  if (range) {
    const positions = range.replace(/bytes=/, '').split('-')
    const start = positions[0] ? parseInt(positions[0], 10) : 0
    const total = stat.size
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1
    const chunk_size = end - start + 1

    extend(headers, {
      'Accept-Ranges': 'bytes',
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Content-Length': chunk_size.toString(),
    })

    option.start = start
    option.end = end
  }

  const fs_stream = fsStream(static_path, option)

  return new NextResponse(fs_stream, {
    status: range ? 206 : 200,
    headers: headers,
  })
}
