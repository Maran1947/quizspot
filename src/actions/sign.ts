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
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const { email, password } = validatedFields.data
  let redirectPath: string | null = null
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    redirectPath = '/dashboard'
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      const { type, cause } = error as AuthError
      switch (type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        case 'CallbackRouteError':
          return { error: cause?.err?.toString() }
        default:
          return { error: 'Something went wrong' }
      }
    }
  } finally {
    if (redirectPath) {
      redirect(redirectPath)
    }
  }
}
