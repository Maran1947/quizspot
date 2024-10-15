'use server'
import { auth } from '@/auth'
import { ResetPasswordFormSchema } from '@/lib/definitions'
import { prisma } from '@/prismaClient'
import bcrypt from 'bcryptjs'

export const resetPasswordHandler = async (formData: FormData) => {
  const validatedFields = ResetPasswordFormSchema.safeParse({
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword')
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const { currentPassword, newPassword } = validatedFields.data

  try {
    const session = await auth()
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string }
    })

    if (!user) {
      return { error: 'Unauthorized' }
    }

    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password)

    if (!isPasswordMatch) {
      return { error: 'Invalid current password' }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(
      newPassword,
      salt
    )

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    })

    return { message: 'Password reset successfully' }
  } catch (error) {
    console.log(error)
    return { error: 'Something went wrong' }
  }
}
