import { auth } from '@/auth'
import { connectDB } from '@/db/connect'
import { Quiz } from '@/models/quiz'
import { User } from '@/models/user'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await auth()
    await connectDB()
    const user = await User.findOne({ email: session?.user?.email })

    const quizzes = await Quiz.find({ userId: user._id })

    return NextResponse.json({ success: true, quizzes })
  } catch (error) {
    console.log('Error occurred in get all quizzes by userId: ', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong!' },
      { status: 500 }
    )
  }
}
