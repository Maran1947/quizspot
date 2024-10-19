'use client'
import { usePathname, useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'
import { IoMdSettings } from 'react-icons/io'
import { MdDashboard, MdQuiz } from 'react-icons/md'

const MenuItem = ({
  icon,
  text,
  textClassName,
  redirectTo,
  pathname
}: {
  icon: ReactNode
  text: string
  textClassName: string
  redirectTo: string
  pathname: string
}) => {
  const router = useRouter()
  const handleRedirect = () => {
    router.push(redirectTo)
  }
  return (
    <div
      onClick={handleRedirect}
      className={`flex flex-col gap-2 items-center py-2 mt-2 cursor-pointer hover:text-[var(--color-primary-300)] dark:hover:text-[var(--color-primary-300)] ${
        pathname === redirectTo
          ? 'text-[var(--color-primary-100)]'
          : 'text-black dark:text-gray-400'
      }`}
    >
      {icon}
      <span className={textClassName}>{text}</span>
    </div>
  )
}

const DashboardSidebar = () => {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <div className="w-[40px] sm:w-[120px] h-[92vh] drop-shadow-lg bg-[var(--color-surface-mixed-300)] flex flex-col justify-between py-4 text-black dark:bg-[var(--color-dark-surface-mixed)]">
      <div className="px-2 sm:px-6">
        <MenuItem
          redirectTo="/dashboard"
          text="Dashboard"
          textClassName="hidden sm:block text-sm"
          icon={<MdDashboard className="text-2xl sm:text-4xl" />}
          pathname={pathname}
        />
        <MenuItem
          redirectTo="/dashboard/quiz"
          text="Quiz"
          textClassName="hidden sm:block text-sm"
          icon={<MdQuiz className="text-2xl sm:text-4xl" />}
          pathname={pathname}
        />
      </div>
      <div className="px-2 sm:px-6">
        <MenuItem
          text={'Settings'}
          textClassName={'hidden sm:block text-sm'}
          icon={<IoMdSettings className="text-2xl sm:text-4xl" />}
          redirectTo="/dashboard/settings"
          pathname={pathname}
        />
      </div>
    </div>
  )
}

export default DashboardSidebar
