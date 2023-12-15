import React from 'react'
import { FileOutlined, FileZipOutlined, FolderOutlined, VideoCameraOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { isGif, isImage, isVideo, isZip } from '@/components/preview/ext-rxp'
import { usePreviewGroupDispatch } from '@/components/preview/proview-group-context'
import { ReaddirItemType } from '@/explorer-manager/src/type'
import { useReplacePathname } from '@/components/use-replace-pathname'
import { useVideoPathDispatch } from '@/components/video-modal/video-path-context'

const Preview: React.FC<{ item: ReaddirItemType }> = ({ item }) => {
  const previewGroupDispatch = usePreviewGroupDispatch()
  const videoPathDispatch = useVideoPathDispatch()
  const { name, is_directory } = item
  const { staticPath } = useReplacePathname()

  if (is_directory) {
    return <FolderOutlined />
  }

  if (isVideo(name)) {
    return <VideoCameraOutlined onClick={() => videoPathDispatch(staticPath(name))} />
  }

  if (isImage(name)) {
    const image_path = staticPath(name)

    return (
      <Image
        onClick={() => previewGroupDispatch(name)}
        src={image_path}
        alt={name}
        fill
        sizes="375px"
        style={{
          objectFit: 'scale-down', //"contain" | "cover" | "fill" | "none" | "scale-down"
        }}
        unoptimized={isGif(image_path)}
        placeholder="empty"
      />
    )
  }

  if (isZip(name)) {
    return <FileZipOutlined />
  }

  return <FileOutlined />
}

export default Preview
