import { NextRequest, NextResponse } from 'next/server'
import { node7zaUnpackAction } from '@/explorer-manager/src/7zip/7zip.mjs'
import { nodeStreamToIterator } from '@/explorer-manager/src/main.mjs'

const encoder = new TextEncoder()

const iteratorToStream = (iterator: AsyncGenerator) => {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next()

      if (done) {
        controller.close()
      } else {
        controller.enqueue(encoder.encode(JSON.stringify(value) + ', '))
      }
    },
  })
}

export const POST = async (req: NextRequest) => {
  const { path, out_path, pwd } = await req.json()

  try {
    const stream = node7zaUnpackAction(path, out_path, pwd)

    stream.on('data', (item) => {
      console.log('data', item.file)
    })

    const interval = setInterval(() => {
      console.log('interval', stream.info)
      stream.push({ loading: Date.now() })
    }, 1000)

    const timeout = setTimeout(
      () => {
        clearInterval(interval)
      },
      60 * 10 * 1000,
    )

    stream.on('end', () => {
      console.log('end', stream.info)

      stream.push({
        done: JSON.stringify(Object.fromEntries(stream.info), null, 2),
      })

      clearTimeout(timeout)
      clearInterval(interval)

      stream.push(null)
    })

    return new NextResponse(iteratorToStream(nodeStreamToIterator(stream)), {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    })
  } catch (e) {
    return NextResponse.json({ ret: -1, err_msg: e })
  }
}
