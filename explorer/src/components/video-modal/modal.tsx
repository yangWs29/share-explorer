'use client'
import React from 'react'
import { Button, Modal } from 'antd'
import { isEmpty } from 'lodash'
import VideoJS from '@/components/video-modal/video-js'
import Player from 'video.js/dist/types/player'
import { useVideoPathDispatch, useVideoPathStore } from '@/components/video-modal/video-path-context'
import PlayList from '@/components/video-modal/play-list'
import { openIINA } from '@/components/video-modal/open-iina'

const PlayItem: React.FC = () => {
  const video_path = useVideoPathStore()
  const playerRef = React.useRef<Player | null>(null)

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: video_path,
        type: 'video/mp4',
      },
    ],
  }

  return (
    <VideoJS
      options={videoJsOptions}
      onReady={(player) => {
        playerRef.current = player

        player.on('waiting', () => {
          console.log('player is waiting')
        })

        player.on('dispose', () => {
          console.log('player will dispose')
        })
      }}
    />
  )
}

const VideoModal: React.FC = () => {
  const video_path = useVideoPathStore()
  const videoPathDispatch = useVideoPathDispatch()
  const filename = decodeURIComponent(video_path).split('/').pop()

  return (
    <Modal
      title={<>{filename}</>}
      open={!isEmpty(video_path)}
      width="90%"
      onCancel={() => videoPathDispatch('')}
      footer={<Button onClick={() => window.open(openIINA(`${window.location.origin}${video_path}`))}>IINA</Button>}
      destroyOnClose={true}
      style={{ top: 20 }}
      styles={{
        body: {
          height: '85vh',
          position: 'relative',
        },
      }}
    >
      <PlayItem />
      <PlayList />
    </Modal>
  )
}

export default VideoModal
