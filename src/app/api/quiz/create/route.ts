import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { IQuizQuestionPayload } from '@/interfaces/payload'
import { prisma } from '@/prismaClient'

export async function POST(req: Request) {
  try {
    const {
      data: { quizType, quizDetails, quizQuestions }
    } = await req.json()

    const session = await auth()
    const user = await prisma.user.findUnique({ where: { email: session?.user?.email as string } })

    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const newQuiz = await prisma.quiz.create({
      data: {
        quizType,
        title: quizDetails.title,
        topic: quizDetails.topic,
        totalQuestions: quizDetails.totalQuestions,
        timePerQuestion: quizDetails.timePerQuestion,
        difficulty: quizDetails.difficulty,
        userId: user.id,
        roomCode: nanoid(10)
      }
    })

    const newQuizQuestions = quizQuestions.map(
      (quizQuestion: IQuizQuestionPayload) => {
        return {
          quizId: newQuiz.id,
          questionText: quizQuestion.questionText,
          questionNumber: quizQuestion.questionNumber,
          correctOption: quizQuestion.correctOption,
          options: quizQuestion.options
        }
      }
    )

    await prisma.question.createMany({ data: newQuizQuestions })

    return NextResponse.json(
      { success: true, quizId: newQuiz.id },
      { status: 200 }
    )
  } catch (error) {
    console.log('Error: ', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong'
      },
      { status: 500 }
    )
  }
}
