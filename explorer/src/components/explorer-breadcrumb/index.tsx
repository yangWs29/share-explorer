'use client'
import React from 'react'
import Link from 'next/link'
import { HomeOutlined } from '@ant-design/icons'
import { usePathname } from 'next/navigation'
import { Breadcrumb, Space } from 'antd'
import BreadcrumbDropdownReaddir from '@/components/breadcrumb-dropdown-readdir'

type ItemType = { title: string; href: string }

const ExplorerBreadcrumb: React.FC = () => {
  const pathname = usePathname() || ''

  return (
    <Space>
      <Breadcrumb
        items={decodeURIComponent(pathname)
          .split('/')
          .filter(Boolean)
          .reduce<ItemType[]>((p, c) => {
            const last = p[p.length - 1]

            return p.concat({ title: c, href: [last?.href, c].join('/') })
          }, [])
          .map(({ title, href }, k, { length }) => {
            return {
              title:
                length === k + 1 && length !== 1 ? (
                  title
                ) : (
                  <BreadcrumbDropdownReaddir href={href}>
                    <Link href={href}>{k === 0 ? <HomeOutlined /> : title}</Link>
                  </BreadcrumbDropdownReaddir>
                ),
            }
          })}
      />
    </Space>
  )
}

export default ExplorerBreadcrumb
