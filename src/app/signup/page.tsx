'use client'
import { signupHandler } from '@/actions/signup'
import Loading from '@/components/loading/loading'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const SignupPage = () => {
  const [fullName, setFullName] = useState('')
  const [userame, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{
    name?: string
    password?: string
    confirmPassword?: string
    email?: string
    username?: string
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSignupFormAction = async (formData: FormData) => {
    if (formData.get('password') !== formData.get('confirmPassword')) {
      setErrors({
        confirmPassword: 'Password mismatch.'
      })
      return
    }
    setLoading(true)
    try {
      const response = await signupHandler(formData)
      if (response.redirectPath) {
        router.replace('/dashboard')
      }
      console.log(response)
      if (response?.errors) {
        setErrors({
          name: response.errors.name?.join(' - ') || '',
          password: response.errors.password?.join(' - ') || '',
          email: response.errors.email?.join(' - ') || '',
          username: response.errors.username?.join(' - ') || ''
        })
        return
      }

      if (response?.error) {
        toast.error(response.error)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-[var(--color-surface-mixed-100)]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="w-full bg-[var(--color-suface-mixed-200)] rounded-lg shadow-[0px_1px_15px_0px_#0000001a] md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">
              Create a new account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action={handleSignupFormAction}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-500"
                >
                  Your name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  name="name"
                  id="fullname"
                  className="bg-[var(--color-surface-mixed-200)] border border-gray-300 text-black rounded-lg focus:outline-none focus:border-black block w-full p-2.5"
                  placeholder="Enter your name"
                  required
                />
                {errors && errors.name && (
                  <span className="text-sm text-red-500">{errors.name}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-500"
                >
                  Your username
                </label>
                <input
                  value={userame}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  name="username"
                  id="username"
                  className="bg-[var(--color-surface-mixed-200)] border border-gray-300 text-black rounded-lg focus:outline-none focus:border-black block w-full p-2.5"
                  placeholder="Enter your username"
                  required
                />
                {errors && errors.username && (
                  <span className="text-sm text-red-500">
                    {errors.username}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-500"
                >
                  Your email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-[var(--color-surface-mixed-200)] border border-gray-300 text-black rounded-lg focus:outline-none focus:border-black block w-full p-2.5"
                  placeholder="name@example.com"
                  required
                />
                {errors && errors.email && (
                  <span className="text-sm text-red-500">{errors.email}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-500"
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-[var(--color-surface-mixed-200)] border border-gray-300 text-black rounded-lg focus:outline-none focus:border-black block w-full p-2.5"
                  required
                />
                {errors && errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-500"
                >
                  Confirm Password
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-[var(--color-surface-mixed-200)] border border-gray-300 text-black rounded-lg focus:outline-none focus:border-black block w-full p-2.5"
                  required
                />
                {errors && errors.confirmPassword && (
                  <span className="text-sm text-red-500">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full text-white bg-[var(--color-primary-300)] hover:bg-[var(--color-primary-200)] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {loading ? (
                  <Loading type="spin" color="white" width={24} height={24} />
                ) : (
                  'Sign up'
                )}
              </button>
              <p className="text-sm font-light text-gray-600">
                Already have an account?{' '}
                <a
                  href="/signin"
                  className="font-medium text-[var(--color-primary-200)] hover:underline"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignupPage
