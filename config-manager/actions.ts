'use server'
import { getConfig, saveConfig } from './edit-config.mjs'

export const getConfigAction: () => Promise<ReturnType<typeof getConfig>> = async () => {
  return getConfig()
}

export const saveConfigAction: (
  ...arg: Parameters<typeof saveConfig>
) => Promise<ReturnType<typeof saveConfig>> = async (data) => {
  return saveConfig(data)
}
