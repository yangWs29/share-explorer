'use client'
import React, { useContext, useState } from 'react'
import { Button, Space } from 'antd'
import { ReaddirItemType } from '@/explorer-manager/src/type'
import styled from 'styled-components'
import { isEmpty } from 'lodash'
import { FolderOpenOutlined, FolderOutlined, LoadingOutlined, MinusOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { readdirAction } from '@/app/path/actions'

export const LiStyle = styled.li``

export const UlStyle = styled.ul`
  padding-left: 20px;
  list-style: none;
`

export type OnSelectType = (path: string[]) => void

const SelectPathInputContext = React.createContext<{ onSelect?: OnSelectType; highlight_path?: string }>(null!)

const useReaddirRequest = (
  { manual, init_path }: { manual: boolean; init_path: string } = { manual: false, init_path: '' },
) => {
  return useRequest((path: string = init_path) => readdirAction({ path: path, only_dir: '1' }), {
    manual,
    cacheKey: init_path ? init_path : undefined,
    staleTime: 5000,
  })
}

const EmptyItem: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <UlStyle>
      <li>{children}</li>
    </UlStyle>
  )
}

const Li: React.FC<{ item: ReaddirItemType; parent_path: string[] }> = ({ item, parent_path }) => {
  const [open, changeOpen] = useState(false)
  const path = parent_path.concat(item.name)
  const ctx = useContext(SelectPathInputContext)

  const { highlight_path = '' } = ctx

  const is_highlight =
    !!highlight_path && new RegExp(`^${encodeURIComponent(path.join('/'))}`).test(encodeURIComponent(highlight_path))

  const btn_tye = is_highlight ? 'primary' : 'text'

  return (
    <LiStyle data-h={highlight_path} data-p={path.join('/')}>
      <Space.Compact
        onClick={() => {
          changeOpen(!open)
        }}
      >
        {open ? (
          <Button type={btn_tye} icon={<FolderOpenOutlined />} />
        ) : (
          <Button type={btn_tye} icon={<FolderOutlined />} />
        )}
        <Button type={btn_tye} onClick={() => ctx.onSelect?.(path)}>
          {item.name}
        </Button>
      </Space.Compact>
      {open && <Ul parent_path={path} />}
    </LiStyle>
  )
}

const Ul: React.FC<{ parent_path: string[] }> = ({ parent_path = [] }) => {
  const { data: dir_list, loading } = useReaddirRequest({ manual: false, init_path: parent_path.join('/') })

  return !dir_list && loading ? (
    <EmptyItem>
      <LoadingOutlined />
    </EmptyItem>
  ) : isEmpty(dir_list) ? (
    <EmptyItem>
      <MinusOutlined />
    </EmptyItem>
  ) : (
    <UlStyle>
      {dir_list?.map((item) => {
        return <Li key={item.name} item={item} parent_path={parent_path} />
      })}
    </UlStyle>
  )
}

export const Tree: React.FC<{ onSelect?: OnSelectType; highlight_path?: string }> = ({ onSelect, highlight_path }) => {
  return (
    <SelectPathInputContext.Provider value={{ onSelect, highlight_path: highlight_path?.replace(/^\//, '') }}>
      <Ul parent_path={[]} />
    </SelectPathInputContext.Provider>
  )
}
