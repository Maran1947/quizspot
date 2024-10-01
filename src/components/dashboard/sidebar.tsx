'use client'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'
import { IoMdSettings } from 'react-icons/io'
import { MdDashboard, MdQuiz } from 'react-icons/md'

const MenuItem = ({
  icon,
  text,
  textClassName,
  redirectTo
}: {
  icon: ReactNode
  text: string
  textClassName: string
  redirectTo: string
}) => {
  const router = useRouter()
  const handleRedirect = () => {
    router.push(redirectTo)
  }
  return (
    <div
      onClick={handleRedirect}
      className="flex flex-col gap-2 items-center py-2 mt-2 cursor-pointer"
    >
      {icon}
      <span className={textClassName}>{text}</span>
    </div>
  )
}

const DashboardSidebar = () => {
  return (
    <div className="w-[120px] h-[92vh] drop-shadow-lg bg-[var(--color-surface-mixed-300)] flex flex-col justify-between py-4 text-black">
      <div className="px-6">
        <MenuItem
          redirectTo="/dashboard"
          text="Dashboard"
          textClassName="text-sm"
          icon={<MdDashboard className="text-4xl" />}
        />
        <MenuItem
          redirectTo="/dashboard/quiz"
          text="Quiz"
          textClassName="text-sm"
          icon={<MdQuiz className="text-4xl" />}
        />
      </div>
      <div className="px-6">
        <MenuItem
          text={'Settings'}
          textClassName={'text-sm'}
          icon={<IoMdSettings className="text-4xl" />}
          redirectTo="/dashboard/settings"
        />
      </div>
    </div>
  )
}

export default DashboardSidebar
