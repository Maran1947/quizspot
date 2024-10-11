import { generateQuizQuestions } from '@/actions/ai/aiHandler'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { quizDetails } = data
    const generatedQuestions = await generateQuizQuestions({
      topic: quizDetails.topic,
      totalQuestions: quizDetails.totalQuestions,
      level: quizDetails.difficulty
    })
    return NextResponse.json(
      { success: true, generatedQuestions },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong'
      },
      { status: 500 }
    )
  }
}
