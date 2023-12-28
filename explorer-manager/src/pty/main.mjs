import pty from 'node-pty'
import fs from 'fs'
import { formatPath } from '../format-path.mjs'

const zsh = fs.existsSync('/bin/zsh') && 'zsh'
const bash = fs.existsSync('/bin/bash') && 'bash'
const sh = fs.existsSync('/bin/sh') && 'sh'

const [shell] = [zsh, bash, sh].filter(Boolean)

console.log({ shell })

/**
 *
 * @param {string} terminal_path
 * @returns {import('node-pty').IPty}
 */
export const initPty = (terminal_path) => {
  const cwd = formatPath(terminal_path)

  return pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: cwd,
    env: process.env,
  })
}
