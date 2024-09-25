import NextAuth, { CredentialsSignin } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from './models/user'
import bcrypt from 'bcryptjs'
import { LoginFormSchema } from './lib/definitions'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      authorize: async (credentials) => {
        const validatedFields = LoginFormSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = credentials

          const user = await User.findOne({ email })

          if (!user || !user.password) {
            throw new CredentialsSignin('Invalid email/password!')
          }

          const isPasswordMatch = await bcrypt.compare(
            password as string,
            user.password
          )

          if (isPasswordMatch) {
            console.log({ user })
            return user
          }
        }

        return
      }
    })
  ]
})
