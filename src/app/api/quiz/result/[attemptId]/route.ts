import { auth } from '@/auth'
import { prisma } from '@/prismaClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { attemptId: string } }
) {
  const { attemptId } = params
  try {
    const session = await auth()
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const submissions = await prisma.submission.findMany({
      where: {
        attemptId: attemptId,
        userId: user.id
      },
      include: {
        question: true, // Automatically fetches related Question
        quiz: true // Automatically fetches related Quiz
      }
    })

    const attempt = await prisma.attempt.findUnique({
      where: {
        id: attemptId
      }
    })

    if (attempt?.result) {
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
      if (submission.answer === submission.question.correctOption) {
        totalCorrectAnswers += 1
      }
    }

    const accuracy =
      (totalCorrectAnswers / submissions[0].quiz.totalQuestions) * 100
    const score = totalCorrectAnswers * 10
    const totalScore = submissions[0].quiz.totalQuestions * 10

    const result = {
      accuracy,
      totalCorrectAnswered: totalCorrectAnswers,
      score,
      totalScore,
      totalQuestionsAnswered: submissions.length
    }

    await prisma.attempt.update({
      where: {
        id: attemptId
      },
      data: {
        result: result
      }
    })

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
