import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

interface IPath {
  [key: string]: string;
}

interface Props {
  paths: IPath[];
}

export const BreadCrumbNav = ({ paths }: Props) => {
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {paths.map((path: IPath, index: number) => (
        <Breadcrumb.Item key={index}>
          <Link key={index} to={`${path.link}`}>
            {path.title}
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
