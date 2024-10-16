import { auth } from '@/auth'
import { IQuizAttemptsGroup, IQuizResult } from '@/interfaces/quiz'
import { prisma } from '@/prismaClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const filterBy = req.nextUrl.searchParams.get('filterBy')
  try {
    const session = await auth()
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    let quizzes = []
    if (filterBy === 'attempted') {
      const attempts = await prisma.attempt.findMany({
        where: { userId: user.id },
        include: { quiz: true }
      })
      const groupedAttempts = attempts.reduce((acc: { [quizId: string]: IQuizAttemptsGroup  }, attempt) => {
        const quizId = attempt.quizId

        if (!acc[quizId]) {
          acc[quizId] = {
            quiz: attempt.quiz,
            attempts: []
          }
        }

        acc[quizId].attempts.push({
          id: attempt.id,
          createdAt: attempt.createdAt,
          quiz: attempt.quiz,
          quizId: attempt.quizId,
          result: attempt.result ? (attempt.result as unknown as IQuizResult) : null
        })

        return acc
      }, {})

      quizzes = Object.values(groupedAttempts)
    } else {
      quizzes = await prisma.quiz.findMany({ where: { userId: user.id } })
    }

    return NextResponse.json({ success: true, quizzes }, { status: 200 })
  } catch (error) {
    console.log('Error occurred in get all quizzes by userId: ', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong!' },
      { status: 500 }
    )
  }
}
