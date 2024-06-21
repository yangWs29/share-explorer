'use client'
import React, { useEffect } from 'react'
import { InlinePathContext } from '@/components/desktop/inline-path-context'
import { WindowBodyStyle } from '@/components/desktop/style'
import { Card, List } from 'antd'
import { ReaddirItemType } from '@/explorer-manager/src/type'
import { Preview } from '@/components/preview'
import styled from 'styled-components'
import { useCardColumnContext } from '@/app/path/card-colunm-context'
import { ReaddirContext, useGetReaddir } from '@/app/path/readdir-context'
import ExplorerBreadcrumb from '@/components/desktop/explorer-window/breadcrumb'
import WindowBox from '@/components/desktop/window-box'

export const ItemStyle = styled.div`
  font-size: 3.8em;
  padding: ${61.8 / 2}% 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Item: React.FC<{ item: ReaddirItemType }> = ({ item }) => {
  const changePath = InlinePathContext.useDispatch()
  const path = InlinePathContext.useStore()

  return (
    <List.Item style={{ padding: '0 8px' }}>
      <Card title={item.name}>
        <ItemStyle
          onClick={() => {
            if (item.is_directory) {
              changePath([path, item.name].join('/').split('/').filter(Boolean).join('/'))
            }
          }}
        >
          <Preview item={item} />
        </ItemStyle>
      </Card>
    </List.Item>
  )
}

const ExplorerBody: React.FC = () => {
  const path = InlinePathContext.useStore()
  const column = useCardColumnContext()
  const changeReaddirList = ReaddirContext.useDispatch()
  const readdir_list = ReaddirContext.useStore()

  const { data, runAsync, loading } = useGetReaddir()

  useEffect(() => {
    runAsync(path).then((data) => {
      changeReaddirList(data)
    })
  }, [path])

  return (
    <WindowBodyStyle>
      {data && (
        <List
          loading={loading}
          grid={{ gutter: 0, column: column }}
          dataSource={readdir_list}
          renderItem={(item) => {
            return <Item item={item} />
          }}
        />
      )}
    </WindowBodyStyle>
  )
}

const WindowContent: React.FC<{ window_id: number }> = ({ window_id }) => {
  return (
    <WindowBox window_id={window_id} title={<ExplorerBreadcrumb />}>
      <ExplorerBody />
    </WindowBox>
  )
}

export default WindowContent
