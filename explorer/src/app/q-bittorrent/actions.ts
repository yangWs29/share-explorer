'use server'
import { getClient, getSyncMainData, getTransferInfo } from '@/q-bittorrent/src/main.mjs'

export const getTransferInfoAction = getTransferInfo

export const getSyncMainDataAction = getSyncMainData

export const getListTorrentsAction = () => getClient().listTorrents()
