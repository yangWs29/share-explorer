'use client'
import createCtx from '@/lib/create-ctx'
import { ReaddirListType } from '@/explorer-manager/src/type'
import React from 'react'
import { useReplacePathname } from '@/components/use-replace-pathname'
import { useRouter } from 'next/navigation'
import axios, { AxiosRequestConfig } from 'axios'
import { useRequest } from 'ahooks'

export const axiosGetReaddir = (opt: AxiosRequestConfig<ReaddirListType>) =>
  axios.get<{ readdir: ReaddirListType }>('/path/api/readdir', opt)

export const useGetReaddir = () => {
  return useRequest(
    (path: string) =>
      axiosGetReaddir({
        params: { path, only_dir: '0', only_file: '0', has_file_stat: '1' },
      }).then(({ data }) => data),
    { manual: true },
  )
}

const ReaddirContext = createCtx<ReaddirListType>()

export const useReaddirContext = () => {
  return ReaddirContext.useStore()
}

export const useDeleteReaddirItem = () => {
  const readdir_list = ReaddirContext.useStore()
  const changeReaddirList = ReaddirContext.useDispatch()
  const { update } = useUpdateReaddirList()

  return (name: string) => {
    update()
    changeReaddirList(readdir_list.filter((item) => item.name !== name))
  }
}

export const useUpdateReaddirList = () => {
  const { replace_pathname } = useReplacePathname()
  const { runAsync } = useGetReaddir()
  const changeReaddirList = ReaddirContext.useDispatch()
  const router = useRouter()

  return {
    update: () => {
      runAsync(replace_pathname).then((data) => {
        router.refresh()
        changeReaddirList(data.readdir)
      })
    },
  }
}

export const ReaddirProvider: React.FC<React.ProviderProps<ReaddirListType>> = ({ value, children }) => {
  return <ReaddirContext.ContextProvider value={value}>{children}</ReaddirContext.ContextProvider>
}
