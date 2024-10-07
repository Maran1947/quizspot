import { auth } from '@/auth'
import { connectDB } from '@/db/connect'
import { Question } from '@/models/question'
import { Quiz } from '@/models/quiz'
import { User } from '@/models/user'
import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { IQuizQuestionPayload } from '@/interfaces/payload'

export async function POST(req: Request) {
  try {
    const {
      data: { quizType, quizDetails, quizQuestions }
    } = await req.json()

    const session = await auth()
    await connectDB()
    const user = await User.findOne({ email: session?.user?.email })

    const newQuiz = new Quiz({
      quizType,
      title: quizDetails.title,
      topic: quizDetails.topic,
      totalQuestions: quizDetails.totalQuestions,
      timePerQuestion: quizDetails.timePerQuestion,
      user: user._id,
      roomCode: nanoid(10)
    })

    await newQuiz.save()

    const newQuizQuestions = quizQuestions.map(
      (quizQuestion: IQuizQuestionPayload) => {
        console.log(quizQuestion)
        const newQuestion = new Question({
          quiz: newQuiz._id,
          questionText: quizQuestion.questionText,
          questionNumber: quizQuestion.questionNumber,
          correctOption: quizQuestion.correctOption,
          options: quizQuestion.options
        })
        return newQuestion
      }
    )

    await Question.insertMany(newQuizQuestions)

    return NextResponse.json(
      { success: true, quizId: newQuiz._id },
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
