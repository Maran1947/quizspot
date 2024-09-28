import { auth } from '@/auth'
import { connectDB } from '@/db/connect'
import { Submission } from '@/models/submission'
import { User } from '@/models/user'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const {
      quizId,
      answers
    }: {
      quizId: string
      answers: {
        [key: string]: { id: string; optionNumber: number; value: string }
      }
    } = data

    const session = await auth()
    await connectDB()
    const user = await User.findOne({ email: session?.user?.email })

    const newSubmissions = []

    for (const questionId in answers) {
      newSubmissions.push({
        userId: user._id,
        quizId,
        questionId,
        answer: answers[questionId].id
      })
    }

    await Submission.insertMany(newSubmissions)

    return NextResponse.json(
      { success: true, message: 'User quiz submission saved successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.log('Error: ', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error'
      },
      { status: 500 }
    )
  }
}
