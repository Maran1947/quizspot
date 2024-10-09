'use client'
import Loading from '@/components/loading/loading'
import { IQuestion, IQuiz } from '@/interfaces/quiz'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaEdit } from 'react-icons/fa'
import { MdCopyAll, MdDelete } from 'react-icons/md'

const QuizViewPage = () => {
  const [loading, setLoading] = useState(false)
  const [quiz, setQuiz] = useState<IQuiz | null>(null)
  const [questions, setQuestions] = useState<IQuestion[]>([])

  const params = useParams()
  const router = useRouter()

  const handleDeleteQuiz = async () => {
    try {
      const response = await axios.delete(`/api/quiz/${quiz!._id}`)
      if (response.status === 200) {
        toast.success('Quiz deleted successfully!')
        router.replace('/dashboard/quiz')
      }
    } catch (error) {
      console.log(error)
      alert(error)
    }
}

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
        <div className="w-full flex items-center justify-center">
          <Loading type="bubbles" color="#dd92e4" width={100} height={100} />
        </div>
      ) : (
        <div>
          <div className='flex items-center justify-between text-black border-b border-black mb-4 py-1'>
            <h2 className="text-3xl">
              {quiz?.title}
            </h2>
            <div className="text-black flex gap-2 items-center">
              <FaEdit className="cursor-pointer text-lg text-[var(--color-primary-200)] hover:text-[var(--color-primary-400)]" />
              <MdDelete
                onClick={handleDeleteQuiz}
                className="cursor-pointer text-lg text-[var(--color-primary-200)] hover:text-[var(--color-primary-400)]"
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 mb-4">
            <h2 className="text-sm sm:text-xl border border-[var(--color-primary-100)] text-[var(--color-primary-100)] py-1 px-4">
              Total Questions: {quiz?.totalQuestions}
            </h2>
            <div className="flex items-center">
              <p className="text-sm sm:text-md py-1 px-2 sm:py-2 sm:px-4 font-medium text-[var(--color-primary-100)] rounded-tl-md rounded-bl-md border border-r-none border-[var(--color-primary-100)]">
                {quiz?._id}
              </p>
              <div className="bg-[var(--color-primary-100)] px-2 py-2 rounded-tr-md rounded-br-md border border-[var(--color-primary-100)]">
                <MdCopyAll className="cursor-pointer text-md sm:text-2xl text-white" />
              </div>
            </div>
          </div>
          {questions.map((question) => {
            return (
              <div
                key={question._id}
                className="bg-[var(--color-surface-mixed-500)] mb-4 shadow-md"
              >
                <h3 className="mb-3 bg-[var(--color-primary-100)] p-3 rounded-tl-lg rounded-tr-lg text-white">
                  Q{(question.questionNumber+1) + '. ' + question.questionText}
                </h3>
                <div className="p-3">
                  {question.options.map((option) => {
                    return (
                      <div
                        key={option.id}
                        className="flex items-center gap-2 mb-2"
                      >
                        <span
                          className={`flex items-center justify-center min-w-[24px] h-[24px] border border-gray-400 ${
                            question.correctOption === option.optionNumber
                              ? 'border-green-400 bg-green-200'
                              : 'border-gray-400'
                          }`}
                        >
                          {option.optionNumber}
                        </span>
                        <span
                          className={
                            question.correctOption === option.optionNumber
                              ? 'bg-green-200'
                              : ''
                          }
                        >
                          {option.optionText}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default QuizViewPage
