import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

interface IPath {
  [key: string]: string
}

interface Props {
  paths: IPath[]
}

export const BreadCrumbNav = ({ paths }: Props ) => {
  return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        {paths.map((path: IPath, index: number) => (
          <Link to={`${path.link}`}>
            <Breadcrumb.Item key={index}>{path.title}</Breadcrumb.Item>
          </Link>
        ))}

      </Breadcrumb>
  )
}