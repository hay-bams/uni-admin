import React from 'react'
import { Layout } from 'antd'
import { Sidebar } from './components/Sidebar'

export const Admin = () => {
  return (
      <Layout>
         <Sidebar />
        <Layout>
          <div>Admin</div>
        </Layout>
      </Layout>
  )
}