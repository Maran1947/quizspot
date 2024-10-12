import { prisma } from '@/prismaClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { quizId: string } }
) {
  const { quizId } = params
  try {
    const quiz = await prisma.quiz.findUnique({ where: { id: quizId } })
    if (!quiz) {
      return NextResponse.json({ success: false, message: 'Quiz not found' }, { status: 404 })
    }
    const questions = await prisma.question.findMany({ where: { quizId } })
    return NextResponse.json({ success: true, quiz, questions }, { status: 200 })
  } catch (error) {
    console.log('Error occurred in get quiz: ', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { quizId: string } }
) {
  const { quizId } = params
  try {
    await prisma.quiz.delete({ where: { id: quizId } })
    return NextResponse.json({ success: true, message: 'Quiz deleted successfully' }, { status: 200 })
  } catch (error) {
    console.log('Error occurred in get quiz: ', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
