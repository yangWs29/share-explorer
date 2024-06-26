'use client'
import React from 'react'
import ConfigFormGroup from '@/app/config/config-form-group'
import { getConfigAction } from '@/config-manager/actions'
import { useRequest } from 'ahooks'

const ConfigPage: React.FC = () => {
  const { data } = useRequest(getConfigAction)
  return data && <ConfigFormGroup config={data} />
}

export default ConfigPage
