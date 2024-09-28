import { connectDB } from '@/db/connect'
import { Question } from '@/models/question'
import { Quiz } from '@/models/quiz'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { quizId: string } }
) {
  const { quizId } = params
  try {
    await connectDB()
    const quiz = await Quiz.findById(quizId)
    const questions = await Question.find({ quizId: quiz._id })
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
    await connectDB()
    await Quiz.findByIdAndDelete(quizId)
    return NextResponse.json({ success: true, message: 'Quiz deleted successfully' }, { status: 200 })
  } catch (error) {
    console.log('Error occurred in get quiz: ', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
