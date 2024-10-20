'use client'
import React from 'react'
import toast from 'react-hot-toast'
import { signinHandler } from '@/actions/signin'
import SubmitButton from '@/components/button/submitButton'
import Link from 'next/link'

const SigninPage = () => {

  const handleSigninFormAction = async (formData: FormData) => {
    try {
      const response = await signinHandler(formData)
      if (response?.errors) {
        toast.error(
          response.errors.email + ' and/or ' + response.errors.password
        )
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
    <section className="h-screen bg-[var(--color-surface-mixed-100)]">
      <div className="flex flex-col items-center justify-center px-6 py-20 mx-auto">
        <div className="w-full bg-[var(--color-suface-mixed-200)] rounded-lg shadow-[0px_1px_15px_0px_#0000001a] md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action={handleSigninFormAction}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-500"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-[var(--color-surface-mixed-200)] border border-gray-300 text-black rounded-lg block w-full p-2.5 focus:outline-none focus:border-black"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-500"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-[var(--color-surface-mixed-200)] border border-gray-300 text-black rounded-lg focus:outline-none focus:border-black block w-full p-2.5"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-sm font-medium text-[var(--color-primary-200)] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
             <SubmitButton label='Sign in' />
              <p className="text-sm font-light text-gray-600">
                Don’t have an account yet?{' '}
                <Link
                  href="/signup"
                  className="font-medium text-[var(--color-primary-200)] hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SigninPage
