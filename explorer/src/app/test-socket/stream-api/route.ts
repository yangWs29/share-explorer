import { iteratorToStream, nodeStreamToIterator } from '@/explorer-manager/src/main.mjs'

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

const encoder = new TextEncoder()

async function* makeIterator() {
  let length = 0

  while (length < 60 * 10) {
    yield encoder.encode(`<p>${length} ${new Date().toLocaleString()}</p>`)
    await sleep(1000)

    length += 1
  }
}

export async function POST() {
  return new Response(iteratorToStream(nodeStreamToIterator(makeIterator())), {
    headers: { 'Content-Type': 'application/octet-stream' },
  })
}

export async function GET() {
  return new Response(iteratorToStream(nodeStreamToIterator(makeIterator())), {
    headers: { 'Content-Type': 'text/html' },
  })
}
