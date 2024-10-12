import { auth } from '@/auth'
import { prisma } from '@/prismaClient'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await auth()
    const user = await prisma.user.findUnique({ where: { email: session?.user?.email as string } })
    
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const quizzes = await prisma.quiz.findMany({ where: { userId: user.id } })

    return NextResponse.json({ success: true, quizzes }, { status: 200 })
  } catch (error) {
    console.log('Error occurred in get all quizzes by userId: ', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong!' },
      { status: 500 }
    )
  }
}
