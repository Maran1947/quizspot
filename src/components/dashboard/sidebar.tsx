'use client'
import React, { ReactNode } from 'react'
import { HiMiniInboxArrowDown } from 'react-icons/hi2'
import { IoMdSettings } from 'react-icons/io'
import { MdDashboard, MdQuiz } from 'react-icons/md'

const MenuItem = ({
  icon,
  text,
  textClassName
}: {
  icon: ReactNode
  text: string,
  textClassName: string
}) => {
  return (
    <div className="flex flex-col gap-2 items-center py-2 mt-2">
      {icon}
      <span className={textClassName}>{text}</span>
    </div>
  )
}

const DashboardSidebar = () => {
  return (
    <div className="w-[120px] h-[92vh] border-r border-r-gray-300 flex flex-col justify-between py-4">
      <div className="px-6" >
        <MenuItem text='Dashboard' textClassName='text-sm' icon={<MdDashboard className="text-4xl" />} />
        <MenuItem text='Quiz' textClassName='text-sm' icon={<MdQuiz className="text-4xl" />} />
        <MenuItem text='Inbox' textClassName='text-sm' icon={<HiMiniInboxArrowDown className="text-4xl" />} />
      </div>
      <div className="px-6 border-t border-t-gray-300">
        <MenuItem
          text={'Settings'}
          textClassName={'text-sm'}
          icon={<IoMdSettings className="text-4xl" />}
        />
      </div>
    </div>
  )
}

export default DashboardSidebar
