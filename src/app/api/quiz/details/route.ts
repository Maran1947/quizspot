import { auth } from '@/auth'
import { connectDB } from '@/db/connect'
import { Attempt } from '@/models/attempt'
import { Quiz } from '@/models/quiz'
import { User } from '@/models/user'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await auth()
    await connectDB()
    const user = await User.findOne({ email: session?.user?.email })

    const totalQuizzesCreated = await Quiz.find({ userId: user._id })
    const distinctAttemptedQuizzes = await Attempt.distinct('quizId')
    const details = await Attempt.aggregate([
      {
        $match: { userId: user._id }
      },
      {
        $group: {
          _id: '$userId',
          totalCorrectAnswered: { $sum: '$result.totalCorrectAnswered' },
          totalQuestionsAnswered: { $sum: '$result.totalQuestionsAnswered' }
        }
      }
    ])

    return NextResponse.json(
      {
        success: true,
        totalQuizzesAttempted: distinctAttemptedQuizzes.length,
        totalQuizzesCreated: totalQuizzesCreated.length,
        totalQuestionsAnswered: details[0].totalQuestionsAnswered || 0,
        totalCorrectAnswered: details[0].totalCorrectAnswered || 0
      },
      { status: 200 }
    )
  } catch (error) {
    console.log('Error occurred in get quiz: ', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
