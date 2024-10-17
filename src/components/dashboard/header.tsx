'use client'
import React from 'react'
import { RiMenu2Line } from 'react-icons/ri'
import { MdLogout } from 'react-icons/md'
import { handleLogout } from '@/actions/logout'
import Link from 'next/link'
import ThemeSwitchButton from '../button/themeSwitchButton'

const DashboardHeader = () => {
  return (
    <div className="w-full h-[8vh] text-black bg-[var(--color-surface-mixed-300)] drop-shadow-lg flex items-center justify-between px-2 sm:px-6">
      <div className="flex items-center gap-4">
        <RiMenu2Line className="text-2xl cursor-pointer" />
        <h2 className="hidden sm:block text-black text-2xl">QuizSpot</h2>
      </div>
      <div className="flex items-center gap-2">
        <ThemeSwitchButton className="text-2xl" />
        <Link
          href={'/quiz/join'}
          className="flex items-center gap-2 text-[var(--color-primary-200)] border border-[var(--color-primary-200)] font-medium px-5 py-1 rounded-[50px] ml-2"
        >
          Join Quiz
        </Link>
        <form action={handleLogout}>
          <button
            type="submit"
            className="flex items-center gap-2 text-red-600 border border-red-600 font-medium px-5 py-1 rounded-[50px]"
          >
            <MdLogout className="font-medium text-xl" />
            Logout
          </button>
        </form>
      </div>
    </div>
  )
}

export default DashboardHeader
