import React from 'react'
import DashboardHeader from '@/components/dashboard/header'
import DashboardSidebar from '@/components/dashboard/sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <DashboardHeader />
      <div className="w-full flex">
        <DashboardSidebar />
        {children}
      </div>
    </div>
  )
}

export default Layout
