import React from 'react'
import { FileOutlined, FileZipOutlined, FolderOutlined, VideoCameraOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { isGif, isImage, isText, isVideo, isZip } from '@/components/preview/ext-rxp'
import { usePreviewGroupDispatch } from '@/components/preview/proview-group-context'
import { ReaddirItemType } from '@/explorer-manager/src/type'
import { explorerPath, staticPath } from '@/components/use-replace-pathname'
import { useVideoPathDispatch } from '@/components/video-modal/video-path-context'
import { useUnpackPathDispatch } from '@/components/unpack-modal/unpack-path-context'
import { EditFileContext } from '@/components/edit-file/edit-file-context'
import styled from 'styled-components'
import { useInlinePathname, useInlineRouter } from '@/components/desktop/inline-path-context'
import Link from 'next/link'

export const ItemStyle = styled(Link)`
  font-size: 3.8em;
  padding: ${61.8 / 2}% 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const FileExtraStyle = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
`

const TextStyle = styled.span`
  font-size: 13px;
  position: absolute;
  font-weight: bolder;
  color: inherit;
  padding: 8px 15px;
`

const FileExtra: React.FC<{ name: string } & React.PropsWithChildren & React.ComponentProps<typeof Item>> = ({
  name,
  children,
  onClick,
}) => {
  return (
    <Item onClick={onClick}>
      <FileExtraStyle>
        {children}
        <TextStyle>{name.split('.').pop()?.slice(0, 5)}</TextStyle>
      </FileExtraStyle>
    </Item>
  )
}

const Item: React.FC<React.PropsWithChildren & { onClick?: () => void }> = ({ children, onClick }) => {
  return (
    <div className="preview-item" onClick={onClick}>
      {children}
    </div>
  )
}

export const Preview: React.FC<{ item: ReaddirItemType }> = ({ item }) => {
  const previewGroupDispatch = usePreviewGroupDispatch()
  const videoPathDispatch = useVideoPathDispatch()
  const { name, is_directory, file_path } = item
  const unpackPathDispatch = useUnpackPathDispatch()
  const editFileDispatch = EditFileContext.useDispatch()

  if (is_directory) {
    return (
      <Item>
        <FolderOutlined />
      </Item>
    )
  }

  if (isVideo(name)) {
    return (
      <FileExtra name={name} onClick={() => videoPathDispatch(staticPath(file_path))}>
        <VideoCameraOutlined />
      </FileExtra>
    )
  }

  if (isImage(name)) {
    const image_path = staticPath(file_path)

    return (
      <Image
        onClick={() => previewGroupDispatch(name)}
        src={image_path}
        alt={name}
        fill
        sizes="384px"
        style={{
          objectFit: 'scale-down', //"contain" | "cover" | "fill" | "none" | "scale-down"
        }}
        unoptimized={isGif(name)}
        placeholder="empty"
      />
    )
  }

  if (isZip(name)) {
    return (
      <FileExtra name={name} onClick={() => unpackPathDispatch(file_path)}>
        <FileZipOutlined />
      </FileExtra>
    )
  }

  if (isText(name)) {
    return (
      <FileExtra
        name={name}
        onClick={() => {
          editFileDispatch(file_path)
        }}
      >
        <FileOutlined />
      </FileExtra>
    )
  }

  return (
    <FileExtra name={name}>
      <FileOutlined />
    </FileExtra>
  )
}

const InjectItemStyle = (props: React.ComponentProps<typeof Preview>) => {
  const { item } = props
  const { push } = useInlineRouter()
  const { is_inline } = useInlinePathname()

  return (
    <ItemStyle
      href={explorerPath(item.file_path)}
      prefetch={false}
      onClick={(e) => {
        if (is_inline) {
          e.preventDefault()
        }

        if (!item.is_directory) {
          e.preventDefault()
        } else {
          push(explorerPath(item.file_path))
        }
      }}
    >
      <Preview {...props} />
    </ItemStyle>
  )
}
export default InjectItemStyle
