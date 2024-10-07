import { auth } from '@/auth'
import { connectDB } from '@/db/connect'
import { Submission } from '@/models/submission'
import { User } from '@/models/user'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { quizId: string } }
) {

  const { quizId } = params
  try {
    const session = await auth()
    await connectDB()
    const user = await User.findOne({ email: session?.user?.email })

    const submissions = await Submission.find({
      quiz: quizId,
      user: user._id
    }).populate(['question']).exec()

    let totalCorrectAnswers = 0
    for (const submission of submissions) {
      console.log(submission.answer , submission.question.correctOption)
      if (submission.answer === submission.question.correctOption) {
        totalCorrectAnswers += 1
      }
    }

    const accuracy =
      (totalCorrectAnswers / submissions[0].quiz.totalQuestions) * 100
    const totalMarks = 10 * totalCorrectAnswers

    return NextResponse.json(
      {
        success: true,
        submissions,
        result: { accuracy, totalCorrectAnswers, totalMarks }
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
