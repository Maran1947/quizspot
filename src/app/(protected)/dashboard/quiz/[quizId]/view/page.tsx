'use client'
import Loading from '@/components/loading/loading'
import { IQuestion, IQuiz } from '@/interfaces/quiz'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const QuizViewPage = () => {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [quiz, setQuiz] = useState<IQuiz | null>(null)
  const [questions, setQuestions] = useState<IQuestion[]>([])

  const getQuiz = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/quiz/${params.quizId}`)
      if (response.status === 200) {
        setQuiz(response.data.quiz)
        setQuestions(response.data.questions)
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        toast.error('Quiz not found!')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.quizId) {
      getQuiz()
    }
  }, [])

  return (
    <div className="w-full p-8">
      {loading ? (
        <Loading type="bubbles" color="#dd92e4" width={100} height={100} />
      ) : (
        <div>
          <h2 className="text-2xl text-black">Title: {quiz?.title}</h2>
          <h2 className="text-xl text-black">
            Total Questions: {quiz?.totalQuestions}
          </h2>
          <h2>Room code: {quiz?._id}</h2>
          {questions.map((question) => {
            return (
              <div key={question._id} className='border-t border-black py-2'>
                <h3>{(question.questionNumber + 1) + ' ' + question.questionText}</h3>
                {question.options.map((option) => {
                  return (
                    <p key={option.id}>
                      {option.optionNumber + ' ' + option.optionText}
                    </p>
                  )
                })}
                <p>Correct Option: {question.correctOption}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default QuizViewPage
