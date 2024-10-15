'use client'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { resetPasswordHandler } from '@/actions/reset-password'
import SubmitButton from '@/components/button/submitButton'

const SettingsPage = () => {
  const [errors, setErrors] = useState<{
    currentPassword?: string
    newPassword?: string
    confirmPassword?: string
  } | null>(null)

  const handleResetPasswordFormAction = async (formData: FormData) => {
    if (formData.get('newPassword') !== formData.get('confirmPassword')) {
      setErrors({
        confirmPassword: 'Password mismatch.'
      })
      return
    }

    try {
      const response = await resetPasswordHandler(formData)
      if (response.message) {
        toast.success(response.message)
        const formElement = document?.getElementById('resetPasswordFormId') as HTMLFormElement
        formElement.reset()
        setErrors(null)
        return
      }

      if (response?.errors) {
        setErrors({
          currentPassword: response.errors.currentPassword?.join(' - ') || '',
          newPassword: response.errors.newPassword?.join(' - ') || ''
        })
        return
      }

      if (response?.error) {
        toast.error(response.error)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }
  return (
    <div className="w-full p-4 sm:p-8">
      <div className="w-full sm:w-[80%] mx-auto border-t-2 border-[var(--color-primary-500)] shadow rounded-md bg-[var(--color-surface-mixed-400)]">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">
            Change Password
          </h1>
          <form
            id='resetPasswordFormId'
            className="space-y-4 md:space-y-6"
            action={handleResetPasswordFormAction}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Current password
              </label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                className="bg-[var(--color-surface-mixed-200)] border border-gray-300 text-black rounded-lg focus:outline-none focus:border-[var(--color-primary-100)] block w-full p-2.5"
                placeholder="••••••••"
                required
              />
              {errors && errors.currentPassword && (
                <span className="text-sm text-red-500">
                  {errors.currentPassword}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                New password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="••••••••"
                className="bg-[var(--color-surface-mixed-200)] border border-gray-300 text-black rounded-lg focus:outline-none focus:border-[var(--color-primary-100)] block w-full p-2.5"
                required
              />
               {errors && errors.newPassword && (
                <span className="text-sm text-red-500">
                  {errors.newPassword}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                className="bg-[var(--color-surface-mixed-200)] border border-gray-300 text-black rounded-lg focus:outline-none focus:border-[var(--color-primary-100)] block w-full p-2.5"
                required
              />
              {errors && errors.confirmPassword && (
                <span className="text-sm text-red-500">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
            <div className="flex items-center justify-end">
              <SubmitButton label='Save' className='w-32' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
