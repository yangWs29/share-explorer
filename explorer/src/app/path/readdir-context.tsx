'use client'
import createCtx from '@/lib/create-ctx'
import { ReaddirListType } from '@/explorer-manager/src/type'
import React from 'react'
import { useReplacePathname } from '@/components/use-replace-pathname'
import { useRouter } from 'next/navigation'
import { useRequest } from 'ahooks'
import { useSortStore } from '@/components/readdir-sort/sort-context'
import { readdirAction } from '@/app/path/actions'
import { sortMap } from '@/components/readdir-sort/sort'

export const useGetReaddir = () => {
  return useRequest((path: string) => readdirAction({ path, only_dir: '0', only_file: '0', has_file_stat: '1' }), {
    manual: true,
  })
}

export const ReaddirContext = createCtx<ReaddirListType>()

export const useReaddirContext = () => {
  const readdir_list = ReaddirContext.useStore()
  const sort = useSortStore()

  return readdir_list.sort(sortMap[sort])
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
  const { data, runAsync, loading, refresh } = useGetReaddir()
  const changeReaddirList = ReaddirContext.useDispatch()
  const router = useRouter()

  return {
    loading: loading,
    refresh: refresh,
    readdir_list: data,
    update: () => {
      runAsync(replace_pathname).then((data) => {
        router.refresh()
        changeReaddirList(data)
      })
    },
  }
}

export const ReaddirProvider: React.FC<React.ProviderProps<ReaddirListType>> = ({ value, children }) => {
  return <ReaddirContext.ContextProvider value={value}>{children}</ReaddirContext.ContextProvider>
}
