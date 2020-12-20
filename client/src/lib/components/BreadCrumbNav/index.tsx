import React from 'react'
import { Breadcrumb } from 'antd'

interface Props {
  paths: string[]
}

export const BreadCrumbNav = ({ paths }: Props ) => {
  return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        {paths.map((path, index) => (
          <Breadcrumb.Item key={index}>{path}</Breadcrumb.Item>
        ))}

      </Breadcrumb>
  )
}