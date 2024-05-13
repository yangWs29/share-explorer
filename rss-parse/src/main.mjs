import fs from 'node:fs'
import { config_dir } from '../conf.mjs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { v4 } from 'uuid'
import Parser from 'rss-parser'

const __dirname = dirname(fileURLToPath(import.meta.url))
const def_config_dir = path.resolve(__dirname, '../rss-config/')
const config_path = path.resolve(config_dir || def_config_dir, 'rss_map.json')

/**
 *
 * @type {import('./types').RSSItemType}
 */
export const def_rss_item = {
  key: '',
  name: '',
  status: 'normal',
  update_interval: 0,
  rss_link: '',
  type: 'default',
  include: '',
  exclude: '',
  download_categories: '',
}

/**
 * @returns {{[key: string]: import('./types').RSSItemType}}
 */
const getRSSJson = () => {
  if (!fs.existsSync(config_path)) {
    fs.mkdirSync(path.dirname(config_path), { recursive: true })
    fs.writeFileSync(config_path, '{}', 'utf-8')

    return {}
  }

  return JSON.parse(fs.readFileSync(config_path, 'utf-8'))
}

const getRSSMap = () => {
  return new Map(Object.entries(getRSSJson()))
}

const writeConfig = (rssMAP) => {
  fs.writeFile(config_path, JSON.stringify(Object.fromEntries(rssMAP), null, 2), 'utf-8', () => {})
}

/**
 *
 * @param {string} key
 * @param {Partial<import('./types').RSSItemType>} value
 * @return {Partial<import('./types').RSSItemType>}
 */
export const setRSS = (key, value) => {
  const rssMAP = getRSSMap()
  const rss_info = rssMAP.get(key) || def_rss_item

  if (!rss_info.key) {
    rss_info.key = v4()
  }

  for (let key in value) {
    rss_info[key] = value[key]
  }

  rssMAP.set(rss_info.key, rss_info)

  writeConfig(rssMAP)

  return value
}

/**
 *
 * @param {string} key
 * @returns {boolean}
 */
export const deleteRSS = (key) => {
  const rssMAP = getRSSMap()
  const status = rssMAP.delete(key)

  writeConfig(rssMAP)

  return status
}

/**
 *
 * @param {string} key
 * @returns {import('./types').RSSItemType}
 */
export const getRSS = (key) => {
  const rssMAP = getRSSMap()
  return rssMAP.get(key)
}

export const getRSSLinkDetail = async (key) => {
  const parser = new Parser()

  const { rss_link } = getRSS(key)

  const detail = await parser.parseURL(rss_link)

  return detail.items.map(({ title, link, pubDate, enclosure }) => {
    return { title, link, pubDate, enclosure: { ...enclosure } }
  })
}

/**
 *
 * @return {IterableIterator<import('./types').RSSItemType>}
 */
export const getRSSList = () => {
  const rssMAP = getRSSMap()
  return rssMAP.values()
}
