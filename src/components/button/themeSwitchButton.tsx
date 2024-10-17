'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { FiMoon, FiSun } from 'react-icons/fi'

interface ThemeSwitchButtonProps {
  className?: string
}

const ThemeSwitchButton = ({ className }: ThemeSwitchButtonProps) => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return <></>
  return resolvedTheme === 'dark' ? (
    <FiSun className={className} onClick={() => setTheme('light')} />
  ) : (
    <FiMoon className={className} onClick={() => setTheme('dark')} />
  )
}

export default ThemeSwitchButton
