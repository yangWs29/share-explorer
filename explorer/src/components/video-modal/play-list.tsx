import React, { useState } from 'react'
import { isVideo } from '@/components/preview/ext-rxp'
import { useReaddirContext } from '@/app/path/readdir-context'
import { useReplacePathname } from '@/components/use-replace-pathname'
import { useVideoPathDispatch, useVideoPathStore } from '@/components/video-modal/video-path-context'
import { Button, Menu } from 'antd'
import styled from 'styled-components'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const PlayListStyle = styled(Menu)`
  position: absolute;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  max-width: 70%;
  min-width: 30%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
`

const PlayHideListStyle = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(100%);

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`

const PlayList: React.FC = () => {
  const [open, changeOpen] = useState(false)
  const readdir = useReaddirContext()
  const { staticPath } = useReplacePathname()
  const videoPathDispatch = useVideoPathDispatch()
  const video_path = useVideoPathStore()

  const video_list = readdir
    .filter((item) => !item.is_directory && isVideo(item.name))
    .map((item) => {
      return {
        key: staticPath(item.name),
        label: item.name,
        onClick: () => {},
      }
    })

  return (
    <>
      {open && (
        <PlayListStyle
          defaultSelectedKeys={[video_path]}
          onClick={(item) => {
            videoPathDispatch(item.key)
          }}
          items={video_list}
        />
      )}

      <PlayHideListStyle onClick={() => changeOpen(!open)}>
        <Button icon={open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
      </PlayHideListStyle>
    </>
  )
}

export default PlayList
