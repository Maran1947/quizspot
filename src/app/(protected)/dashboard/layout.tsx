import React from 'react'
import DashboardHeader from '@/components/dashboard/header'
import DashboardSidebar from '@/components/dashboard/sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <DashboardHeader />
      <div className="w-full flex">
        <DashboardSidebar />
        <div className="w-full h-[92vh] bg-[var(--color-surface-mixed-100)] overflow-y-auto dark:bg-[var(--color-dark-surface)]" >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
