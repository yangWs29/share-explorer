import { useGetCategoriesAction } from '@/app/rss/rss-list/use-get-categories-action'
import { ProFormColumnsType } from '@ant-design/pro-components'
import { RSSItemType } from '@/rss-parse/src/types'

type UseGetFormSchemaType = () => { getFormSchema: () => ProFormColumnsType<RSSItemType>[] }

export const useGetFormSchema: UseGetFormSchemaType = () => {
  const { data: categories } = useGetCategoriesAction()

  return {
    getFormSchema: () => [
      {
        title: 'key',
        dataIndex: 'key',
        readonly: true,
        colProps: { span: 24 },
      },
      {
        title: '名称',
        dataIndex: 'name',
        formItemProps: {
          rules: [{ required: true, message: '请填写标题' }],
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        formItemProps: {
          rules: [{ required: true, message: '请填选择状态' }],
        },
        valueEnum: {
          normal: { text: '正常' },
          deactivate: { text: '停用' },
        },
        colProps: { span: 24 / 4 },
      },
      {
        title: '更新间隔（分钟）',
        dataIndex: 'update_interval',
        colProps: { span: 24 / 4 },
      },
      {
        title: 'RSS 链接',
        dataIndex: 'rss_link',
        formItemProps: {
          rules: [{ required: true, message: '请填 rss 链接地址' }],
        },
        colProps: { span: (24 / 3) * 2 },
      },
      {
        title: '类型',
        dataIndex: 'type',
        colProps: { span: 24 / 3 },
        valueEnum: {
          default: { text: '默认' },
        },
      },
      {
        title: '包含',
        dataIndex: 'include',
        colProps: { span: 24 / 3 },
      },
      {
        title: '排除',
        dataIndex: 'exclude',
        colProps: { span: 24 / 3 },
      },
      {
        title: '下载分类',
        dataIndex: 'download_categories',
        colProps: { span: 24 / 3 },
        valueEnum: categories,
      },
    ],
  }
}
