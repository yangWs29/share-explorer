'use client'
import React from 'react'
import { Image as AntdImage } from 'antd'
import { findIndex } from 'lodash'
import { isImage } from '@/components/preview/ext-rxp'
import { useReplacePathname } from '@/components/use-replace-pathname'
import createCtx from '@/lib/create-ctx'
import { useReaddirContext } from '@/app/path/readdir-context'

export const PreviewGroupContent = createCtx<string>()
export const usePreviewGroup = PreviewGroupContent.useStore
export const usePreviewGroupDispatch = PreviewGroupContent.useDispatch

const AntdImagePreviewGroup: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { staticPath } = useReplacePathname()
  const readdir_list = useReaddirContext()
  const image_list = readdir_list.filter((item) => isImage(item.name))
  const name = usePreviewGroup()
  const previewGroupDispatch = usePreviewGroupDispatch()

  return (
    <AntdImage.PreviewGroup
      preview={{
        visible: !!name,
        current: findIndex(image_list, { name }),
        onVisibleChange: () => {
          previewGroupDispatch('')
        },
        onChange: (current) => {
          previewGroupDispatch(image_list[current].name)
        },
      }}
      items={image_list.map(({ name }) => staticPath(name))}
    >
      {children}
    </AntdImage.PreviewGroup>
  )
}

const PreviewGroupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PreviewGroupContent.ContextProvider value={''}>
      <AntdImagePreviewGroup>{children}</AntdImagePreviewGroup>
    </PreviewGroupContent.ContextProvider>
  )
}

export default PreviewGroupProvider
