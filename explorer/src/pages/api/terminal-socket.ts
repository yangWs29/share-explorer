import { Server as NetServer } from 'http'
import { NextApiRequest } from 'next'
import { Server as ServerIO } from 'socket.io'
import { NextApiResponseServerIO } from '@/pages/api/types'
import { initPty } from '@/explorer-manager/src/pty/main.mjs'
import { IPty } from 'node-pty'
import { ITerminalDimensions } from '@xterm/addon-fit'

export const config = {
  api: {
    bodyParser: false,
  },
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const path = '/api/terminal-socket'
    const http_server: NetServer = res.socket.server as any
    const io = new ServerIO(http_server, {
      path: path,
      addTrailingSlash: false,
    })

    io.on('connection', (socket) => {
      // socket.broadcast.emit('userServerConnection')

      let pty_process: IPty

      socket.on('init-pty', (terminal_path) => {
        socket.emit('init-pty-done')

        pty_process = initPty(terminal_path)

        socket.on('cmd', (msg) => {
          pty_process.write(msg)
        })

        pty_process.onData((res: string) => {
          // process.stdout.write(res)
          socket.emit('cmd-res', res)
        })

        socket.on('update-pty', (info: ITerminalDimensions) => {
          const { rows, cols } = info

          pty_process.resize(cols, rows)

          console.log('pty_process.cols', pty_process.cols)
        })

        socket.on('disconnect', () => {
          pty_process.kill()
          console.log('A user disconnected', socket.id)
        })
      })
    })

    res.socket.server.io = io
  }

  res.end()
}

export default ioHandler
