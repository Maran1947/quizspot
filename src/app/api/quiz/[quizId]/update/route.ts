import { auth } from '@/auth'
import { prisma } from '@/prismaClient'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { quizId: string } }
) {
  try {
    const { updatedQuizDetails } = await req.json()

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

    await prisma.quiz.update({
      where: { id: params.quizId, userId: user.id },
      data: {
        title: updatedQuizDetails.title,
        topic: updatedQuizDetails.topic,
        totalQuestions: updatedQuizDetails.totalQuestions,
        timePerQuestion: updatedQuizDetails.timePerQuestion,
        difficulty: updatedQuizDetails.difficulty
      }
    })

    return NextResponse.json(
      { success: true, message: 'Quiz details updated successfully' },
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
