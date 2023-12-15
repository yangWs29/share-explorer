import React, { KeyboardEvent } from 'react'
import videoJs from 'video.js'
import 'video.js/dist/video-js.css'
import './style.css'
import Player from 'video.js/dist/types/player'
import styled from 'styled-components'

const VideoMain = styled.div`
  .video-js {
    padding-top: 70% !important;
  }
`

export const VideoJS: React.FC<{ options: any; onReady: (player: Player) => void }> = (props) => {
  const video_ref = React.useRef<HTMLDivElement>(null)
  const player_ref = React.useRef<Player | null>(null)
  const { options, onReady } = props

  React.useEffect(() => {
    if (!player_ref.current) {
      const videoElement = document.createElement('video-js')

      videoElement.classList.add('vjs-big-play-centered')
      video_ref.current?.appendChild(videoElement)

      const player = (player_ref.current = videoJs(
        videoElement,
        {
          playbackRates: [0.5, 1, 1.5, 2],
          controlBar: {
            skipButtons: {
              forward: 5,
              backward: 5,
            },
          },
          userActions: {
            hotkeys: (event: KeyboardEvent) => {
              if (event.key === 'ArrowLeft') {
                player_ref.current?.pause()
                player_ref.current?.currentTime((player_ref.current?.currentTime() || 0) - 1 / 25)
              }
              if (event.key === 'ArrowRight') {
                player_ref.current?.pause()
                player_ref.current?.currentTime((player_ref.current?.currentTime() || 0) + 1 / 25)
              }
              if (event.key === 'ArrowUp') {
              }
              if (event.key === 'ArrowDown') {
              }
              if (event.key === ' ') {
                if (player_ref.current?.paused()) {
                  player_ref.current?.play()?.then()
                } else {
                  player_ref.current?.pause()
                }
              }
            },
          },
          ...options,
        },
        () => {
          videoJs.log('player is ready')

          onReady && onReady(player)
        },
      ))
    } else {
      const player = player_ref.current

      player.autoplay(options.autoplay)
      player.src(options.sources)
    }
  }, [onReady, options, video_ref])

  React.useEffect(() => {
    const player = player_ref.current

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        player_ref.current = null
      }
    }
  }, [player_ref])

  return (
    <div data-vjs-player={true}>
      <VideoMain ref={video_ref} />
    </div>
  )
}

export default VideoJS
