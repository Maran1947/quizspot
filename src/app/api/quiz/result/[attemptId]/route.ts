import { auth } from '@/auth'
import { connectDB } from '@/db/connect'
import { Attempt } from '@/models/attempt'
import { Submission } from '@/models/submission'
import { User } from '@/models/user'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { attemptId: string } }
) {
  const { attemptId } = params
  try {
    const session = await auth()
    await connectDB()
    const user = await User.findOne({ email: session?.user?.email })

    const submissions = await Submission.find({
      attemptId,
      userId: user._id
    })
      .populate(['questionId', 'quizId'])
      .exec()

    const attempt = await Attempt.findById(attemptId)

    if (attempt.result.score) {
      return NextResponse.json(
        {
          success: true,
          submissions,
          result: attempt.result
        },
        { status: 200 }
      )
    }

    let totalCorrectAnswers = 0
    for (const submission of submissions) {
      if (submission.answer === submission.questionId.correctOption) {
        totalCorrectAnswers += 1
      }
    }

    const accuracy =
      (totalCorrectAnswers / submissions[0].quizId.totalQuestions) * 100
    const score = totalCorrectAnswers * 10
    const totalScore = submissions[0].quizId.totalQuestions * 10

    const result = {
      accuracy,
      totalCorrectAnswers,
      score,
      totalScore,
      totalQuestionsAnswered: submissions.length
    }

    await Attempt.findByIdAndUpdate(attemptId, { result })

    return NextResponse.json(
      {
        success: true,
        submissions,
        result
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
