import { auth } from '@/auth'
import { prisma } from '@/prismaClient'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await auth()
    const user = await prisma.user.findUnique({ where: { email: session?.user?.email as string } })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const totalQuizzesCreated = await prisma.quiz.count({
      where: { userId: user.id }
    })
    const distinctAttemptedQuizzes = await prisma.attempt.findMany({
      select: { quizId: true },
      distinct: ['quizId']
    })
    const attempts = await prisma.attempt.findMany({
      where: { userId: user.id },
    })

    const details = attempts.reduce(
      (acc, attempt) => {
        const result = attempt.result as {
          totalCorrectAnswered: number
          totalQuestionsAnswered: number
        }

        if (result) {
          acc.totalCorrectAnswered += result.totalCorrectAnswered || 0
          acc.totalQuestionsAnswered += result.totalQuestionsAnswered || 0
        }

        return acc
      },
      { totalCorrectAnswered: 0, totalQuestionsAnswered: 0 }
    )

    return NextResponse.json(
      {
        success: true,
        totalQuizzesAttempted: distinctAttemptedQuizzes.length,
        totalQuizzesCreated,
        totalQuestionsAnswered: details.totalQuestionsAnswered,
        totalCorrectAnswered: details.totalCorrectAnswered
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
