import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config_file_path = path.join(process.env.CONFIG_DIR || __dirname, 'config.json')

const createConfigFile = () => {
  if (!fs.existsSync(config_file_path)) {
    fs.mkdirSync(path.dirname(config_file_path), { recursive: true })
    fs.writeFileSync(config_file_path, '[]', 'utf-8')
    console.log('create config file:', config_file_path)
  }
}

/**
 *
 * @return {import('./typs').APP_CONFIG_TYPE}
 */
export const getConfig = () => {
  createConfigFile()
  return JSON.parse(fs.readFileSync(config_file_path, 'utf-8'))
}

/**
 *
 * @param data {import('./typs').APP_CONFIG_TYPE}
 */
export const saveConfig = (data) => {
  createConfigFile()
  return fs.writeFileSync(config_file_path, JSON.stringify(data, null, 2))
}
