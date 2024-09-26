'use client'
import React from 'react'
import { RiMenu2Line } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";

const DashboardHeader = () => {
  return (
    <div className="w-full h-[8vh] bg-white border border-b-gray-300 flex items-center justify-between px-6">
        <RiMenu2Line className="text-2xl cursor-pointer"/>
        <div className="flex items-center gap-1" >
            <IoIosNotifications className="text-2xl cursor-pointer" />
            <FaCircleUser className="text-2xl cursor-pointer" />
        </div>
    </div>
  )
}

export default DashboardHeader