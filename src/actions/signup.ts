'use server'
import { signIn } from '@/auth'
import { connectDB } from '@/db/connect'
import { SignupFormSchema } from '@/lib/definitions'
import { User } from '@/models/user'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export const signupHandler = async (formData: FormData) => {
  let redirectPath: string | null = null
  try {
    const validatedFields = SignupFormSchema.safeParse({
      name: formData.get('name'),
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password')
    })

    if (!validatedFields.success) {
      console.log({
        errors: validatedFields.error.flatten().fieldErrors
      })
      return { errors: validatedFields.error.flatten().fieldErrors }
    }

    const { name, username, email, password } = validatedFields.data

    await connectDB()

    const isUserExists = await User.findOne({ email })

    if (isUserExists) {
      return { error: 'User already exists!' }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword
    })

    await user.save()

    await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    redirectPath = '/dashboard'
  } catch (error) {
    console.log(error)
    return { error: 'Something went wrong!'}
  } finally {
    if (redirectPath) {
      redirect(redirectPath)
    }
  }
}
