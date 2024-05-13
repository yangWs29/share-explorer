'use server'
import { getSyncMainData, getTransferInfo } from '@/q-bittorrent/src/main.mjs'

export const getTransferInfoAction = getTransferInfo

export const getSyncMainDataAction = getSyncMainData
