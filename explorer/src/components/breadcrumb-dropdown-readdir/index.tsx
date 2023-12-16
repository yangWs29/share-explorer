import React, { useRef } from 'react'
import { Dropdown, Menu } from 'antd'
import { useMount, useRequest } from 'ahooks'
import { encodePathItem, pathExp } from '@/components/use-replace-pathname'
import Link from 'next/link'
import { FolderOpenOutlined, FolderOutlined, LoadingOutlined } from '@ant-design/icons'
import { usePathname } from 'next/navigation'
import { axiosGetReaddir } from '@/app/path/readdir-context'

const ScrollIntoView: React.FC<{ is_open: boolean; className?: string }> = ({ is_open, className }) => {
  const ref = useRef<HTMLDivElement>(null)

  useMount(() => {
    is_open && ref.current?.scrollIntoView({ block: 'center', behavior: 'instant' })
  })

  return is_open ? <FolderOpenOutlined ref={ref} className={className} /> : <FolderOutlined className={className} />
}

const ReaddirMenu: React.FC<{ href: string }> = ({ href }) => {
  const pathname = usePathname() || ''

  const { data = [], loading } = useRequest(
    () =>
      axiosGetReaddir({
        params: { path: href.replace(pathExp, ''), only_dir: 1 },
      }).then(({ data: { readdir } }) => readdir),
    { cacheKey: `readdir-${href}`, staleTime: 60 * 1000 },
  )

  const open_dit_text = decodeURIComponent(pathname).split(href).pop()?.split('/').filter(Boolean).shift() || ''

  return loading ? (
    <LoadingOutlined />
  ) : (
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
}

const BreadcrumbDropdownReaddir: React.FC<React.PropsWithChildren & { href: string }> = ({ children, href }) => {
  return (
    <Dropdown
      destroyPopupOnHide={true}
      arrow={true}
      trigger={['hover']}
      dropdownRender={() => <ReaddirMenu href={href} />}
    >
      {children}
    </Dropdown>
  )
}

export default BreadcrumbDropdownReaddir
