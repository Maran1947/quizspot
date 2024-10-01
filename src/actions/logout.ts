'use server'

import { signOut } from '@/auth'
import { redirect } from 'next/navigation'

export const handleLogout = async () => {
  let redirectPath: string | null = null
  try {
    redirectPath = await signOut({ redirect: false })
  } catch (error) {
    console.log(error)
    throw new Error('Error occurred in logging out')
  } finally {
    if (redirectPath) {
      redirect(redirectPath)
    }
  }
}
