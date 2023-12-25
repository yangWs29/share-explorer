'use server'
import { move } from '@/explorer-manager/src/main.mjs'

export const moveAction: (path: string, new_path: string) => Promise<{ message: string; status: string }> = async (
  path,
  new_path,
) => {
  try {
    await move(path, new_path)

    return Promise.resolve({ status: 'ok', message: '移动成功' })
  } catch (err: any) {
    return Promise.resolve({ status: 'error', message: '移动失败' })
  }
}
