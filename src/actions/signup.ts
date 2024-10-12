'use server'
import { signIn } from '@/auth'
import { SignupFormSchema } from '@/lib/definitions'
import { prisma } from '@/prismaClient'
import bcrypt from 'bcryptjs'

export const signupHandler = async (formData: FormData) => {
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

    const isUserExists = await prisma.user.findFirst({ where: { email } })

    if (isUserExists) {
      return { error: 'User already exists!' }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword
      }
    })

    await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    return { redirectPath: '/dashboard' }
  } catch (error) {
    console.log(error)
    return { error: 'Something went wrong!'}
  }
}
