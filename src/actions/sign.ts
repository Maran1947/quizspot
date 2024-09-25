'use server'
import { signIn } from '@/auth'
import { LoginFormSchema } from '@/lib/definitions'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

export const signinHandler = async (formData: FormData) => {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  })

  if (!validatedFields.success) {
    console.log({
      errors: validatedFields.error.flatten().fieldErrors
    })
    return
  }

  const { email, password } = validatedFields.data
  let redirectPath: string | null = null
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    redirectPath = '/settings'
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      const { type, cause } = error as AuthError
      switch (type) {
        case 'CredentialsSignin':
          throw new Error('Invalid credentials.')
        case 'CallbackRouteError':
          throw new Error(cause?.err?.toString())
        default:
          throw new Error('Something went wrong.')
      }
    }
  } finally {
    if (redirectPath) {
      redirect(redirectPath)
    }
  }
}
