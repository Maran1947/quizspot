'use client'
import Loading from '@/components/loading/loading'
import { IQuiz } from '@/interfaces/quiz'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdCopyAll } from 'react-icons/md'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Link from 'next/link'

const AttemptCard = () => {
  return (
    <div className="bg-[var(--color-surface-mixed-500)] mb-4 shadow-md">
      <div className="flex items-center justify-between bg-[var(--color-primary-200)] mb-3 p-3 rounded-tl-lg rounded-tr-lg">
        <h3 className="text-white text-xl">Attempt 1</h3>
        <Link
          href={`/quiz/result/123`}
          className="px-4 py-1 rounded-lg bg-[var(--color-surface-mixed-100)] text-[var(--color-primary-100)] font-semibold hover:bg-cyan-100"
        >
          View result
        </Link>
      </div>
      <div className="flex items-center gap-4 px-4 pb-4">
        <h2 className="text-sm sm:text-xl border border-[var(--color-primary-100)] text-[var(--color-primary-100)] py-1 px-4">
          Total Questions Answered: 1
        </h2>
        <h2 className="text-sm sm:text-xl border border-[var(--color-primary-100)] text-[var(--color-primary-100)] py-1 px-4">
          Total Correct Answered: 2
        </h2>
        <h2 className="text-sm sm:text-xl border border-[var(--color-primary-100)] text-[var(--color-primary-100)] py-1 px-4">
          Score: 20
        </h2>
      </div>
    </div>
  )
}

const QuizAttemptsPage = () => {
  const [loading, setLoading] = useState(false)
  const [quiz, setQuiz] = useState<IQuiz | null>(null)

  const params = useParams()

  const handleOnCopy = () => {
    toast.success('Copied successfully!')
  }

  const getQuiz = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/quiz/${params.quizId}`)
      if (response.status === 200) {
        setQuiz(response.data.quiz)
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
    <div className="w-full p-4 sm:p-8">
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <Loading type="bubbles" color="#dd92e4" width={100} height={100} />
        </div>
      ) : quiz ? (
        <div>
          <div className="flex items-center justify-between text-black border-b border-black mb-4 py-1">
            <h2 className="text-3xl">{quiz.title}</h2>
          </div>
          <div className="flex flex-col sm:flex-row  items-center justify-between mt-2 mb-4">
            <h2 className="text-sm sm:text-xl border border-[var(--color-primary-100)] text-[var(--color-primary-100)] py-1 px-4">
              Total Questions: {quiz.totalQuestions}
            </h2>
            <div className="flex items-center">
              <p className="text-sm sm:text-md py-1 px-2 sm:py-2 sm:px-4 font-medium text-[var(--color-primary-100)] rounded-tl-md rounded-bl-md border border-r-none border-[var(--color-primary-100)]">
                {quiz.id}
              </p>
              <CopyToClipboard text={quiz.id} onCopy={handleOnCopy}>
                <div className="bg-[var(--color-primary-100)] px-2 py-2 rounded-tr-md rounded-br-md border border-[var(--color-primary-100)]">
                  <MdCopyAll className="cursor-pointer text-md sm:text-2xl text-white" />
                </div>
              </CopyToClipboard>
            </div>
          </div>
          <div>
            <AttemptCard />
          </div>
        </div>
      ) : (
        <div>
          <h2>Not Found</h2>
        </div>
      )}
    </div>
  )
}

export default QuizAttemptsPage
