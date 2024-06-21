'use client'
import React from 'react'
import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb, Button } from 'antd'
import { InlinePathContext } from '@/components/desktop/inline-path-context'

type ItemType = { title: string; href: string }

const ExplorerBreadcrumb: React.FC = () => {
  const pathname = InlinePathContext.useStore()
  const changePath = InlinePathContext.useDispatch()

  const items = decodeURIComponent(pathname)
    .split('/')
    .filter(Boolean)
    .reduce<ItemType[]>((p, c) => {
      const last = p[p.length - 1]

      return p.concat({ title: c, href: [last?.href, c].join('/') })
    }, [])
    .map(({ title, href }) => {
      return {
        title: (
          <Button
            type="text"
            onClick={(e) => {
              e.preventDefault()

              changePath(href)
            }}
          >
            {title}
          </Button>
        ),
      }
    })

  items.splice(0, 0, {
    title: (
      <Button
        type="text"
        icon={<HomeOutlined />}
        onClick={() => {
          changePath('/')
        }}
      />
    ),
  })

  return <Breadcrumb items={items} />
}

export default ExplorerBreadcrumb
