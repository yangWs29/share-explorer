'use client'
import React from 'react'
import { Modal } from 'antd'
import { isEmpty } from 'lodash'
import VideoJS from '@/components/video-modal/video-js'
import Player from 'video.js/dist/types/player'
import { useVideoPathDispatch, useVideoPathStore } from '@/components/video-modal/video-path-context'

const VideoModal: React.FC = () => {
  const video_path = useVideoPathStore()
  const changeVideoPath = useVideoPathDispatch()
  const filename = decodeURIComponent(video_path).split('/').pop()

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
    <Modal
      title={filename}
      open={!isEmpty(video_path)}
      width="75%"
      onCancel={() => changeVideoPath('')}
      footer={false}
      destroyOnClose={true}
    >
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
    </Modal>
  )
}

export default VideoModal
