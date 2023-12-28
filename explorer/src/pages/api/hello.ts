import { Server as NetServer } from 'http'
import { NextApiRequest } from 'next'
import { Server as ServerIO } from 'socket.io'
import { NextApiResponseServerIO } from '@/pages/api/types'

export const config = {
  api: {
    bodyParser: false,
  },
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const path = '/api/hello'
    const http_server: NetServer = res.socket.server as any
    const io = new ServerIO(http_server, {
      path: path,
      addTrailingSlash: false,
    })

    io.on('connection', (socket) => {
      socket.on('message', (msg) => {
        socket.emit('message', `server res: ${msg}`)
      })

      socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id)
        socket.broadcast.emit('user server disconnection', socket.id)
      })
    })

    res.socket.server.io = io
  }

  res.end()
}

export default ioHandler
