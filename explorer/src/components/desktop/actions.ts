'use server'
import { readdir } from '@/explorer-manager/src/main.mjs'

export const readdirAction: (...arg: Parameters<typeof readdir>) => Promise<ReturnType<typeof readdir>> = async (
  ...arg
) => readdir(...arg)
