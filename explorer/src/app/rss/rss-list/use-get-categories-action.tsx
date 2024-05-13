import { useRequest } from 'ahooks'
import { getCategoriesAction } from '@/app/rss/rss-list/actions'
import { ProSchemaValueEnumMap } from '@ant-design/pro-components'

export const useGetCategoriesAction = () => {
  return useRequest(
    async () => {
      const data = await getCategoriesAction()
      const categories: ProSchemaValueEnumMap = new Map()

      for (let key in data) {
        categories.set(key, { text: data[key].name })
      }

      return categories
    },
    { cacheKey: 'get-categories-action' },
  )
}
