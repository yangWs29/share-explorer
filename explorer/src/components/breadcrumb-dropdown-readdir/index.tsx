import React, { useRef } from 'react'
import { Dropdown, Menu } from 'antd'
import { useMount, useRequest } from 'ahooks'
import axios from 'axios'
import { ReaddirListType } from '@/explorer-manager/src/type'
import { encodePathItem, pathExp } from '@/components/use-replace-pathname'
import Link from 'next/link'
import { FolderOpenOutlined, FolderOutlined } from '@ant-design/icons'
import { usePathname } from 'next/navigation'

const ScrollIntoView: React.FC<{ is_open: boolean; className?: string }> = ({ is_open, className }) => {
  const ref = useRef<HTMLDivElement>(null)

  useMount(() => {
    is_open && ref.current?.scrollIntoView({ block: 'center', behavior: 'instant' })
  })

  return is_open ? <FolderOpenOutlined ref={ref} className={className} /> : <FolderOutlined className={className} />
}

const BreadcrumbDropdownReaddir: React.FC<React.PropsWithChildren & { title: string; href: string }> = ({
  children,
  href,
  title,
}) => {
  const pathname = usePathname() || ''

  const { data = [], runAsync } = useRequest(
    () =>
      axios
        .get<{ readdir: ReaddirListType }>('/path/api/readdir', {
          params: { path: href.replace(pathExp, ''), only_dir: 1 },
        })
        .then(({ data: { readdir } }) => {
          return readdir
        }),
    { manual: true, cacheKey: `readdir-${href}`, staleTime: 60 * 1000 },
  )

  const open_dit_text =
    decodeURIComponent(pathname).split([title, '/'].join('')).pop()?.split('/').filter(Boolean).shift() || ''

  return (
    <Dropdown
      destroyPopupOnHide={true}
      arrow={true}
      trigger={['hover']}
      dropdownRender={() => {
        return (
          <Menu
            selectedKeys={[open_dit_text]}
            style={{ maxHeight: '50vw', overflow: 'scroll' }}
            items={data?.map((item) => {
              const is_open = open_dit_text === item.name

              return {
                label: (
                  <Link href={encodePathItem(`${href}/${item.name}`)} prefetch={false}>
                    {item.name}
                  </Link>
                ),
                key: item.name,
                icon: <ScrollIntoView is_open={is_open} />,
              }
            })}
          />
        )
      }}
      onOpenChange={(open) => {
        open && runAsync().then()
      }}
    >
      {children}
    </Dropdown>
  )
}

export default BreadcrumbDropdownReaddir
