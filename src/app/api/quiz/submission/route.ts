import { auth } from '@/auth'
import { prisma } from '@/prismaClient'
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
        [key: string]: { id: string; optionNumber: string; optionText: string }
      }
    } = data

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

    const attempt = await prisma.attempt.create({ data: {
        userId: user.id,
        quizId
    }})

    const newSubmissions = []

    for (const questionId in answers) {
      newSubmissions.push({
        userId: user.id,
        quizId,
        questionId,
        attemptId: attempt.id,
        answer: answers[questionId].optionNumber
      })
    }

    await prisma.submission.createMany({ data: newSubmissions })

    return NextResponse.json(
      { success: true, attemptId: attempt.id },
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
