import { auth } from '@/auth'
import { prisma } from '@/prismaClient'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { questionId: string } }
) {
  try {
    const { quizId, updatedQuestion } = await req.json()

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

    await prisma.question.update({
      where: { id: params.questionId, quizId },
      data: {
        quizId,
        questionText: updatedQuestion.questionText,
        questionNumber: updatedQuestion.questionNumber,
        correctOption: updatedQuestion.correctOption,
        options: updatedQuestion.options
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: `Question ${updatedQuestion.questionNumber} updated successfully`
      },
      { status: 200 }
    )
  } catch (error) {
    console.log('Error occurred in updating quiz details: ', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
