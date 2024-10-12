'use client'

import Loading from '@/components/loading/loading'
import QuestionCard from '@/components/quiz/question'
import { IQuizResult, ISubmission } from '@/interfaces/quiz'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const QuizResultPage = () => {
  const { attemptId } = useParams()
  const [result, setResult] = useState<IQuizResult | null>(null)
  const [submissions, setSubmissions] = useState<ISubmission[]>([])
  const [loading, setLoading] = useState(false)

  const getUserQuizResult = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`/api/quiz/result/${attemptId}`)
      if (response.status === 200) {
        console.log(response.data)
        setSubmissions(response.data.submissions)
        setResult(response.data.result)
      }
    } catch (error) {
      console.log(error)
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (attemptId) {
      getUserQuizResult()
    }
  }, [])

  return (
    <div className="w-full min-h-screen bg-[var(--color-surface-mixed-100)] py-8">
      <div className="bg-[var(--color-primary-500)] w-[98%] sm:max-w-[600px] mx-auto rounded-2xl p-4">
        {loading || !result ? (
          <div className="flex items-center justify-center">
            <Loading type="spin" color="#fff" width={60} height={60} />
          </div>
        ) : (
          <>
            <h2 className="text-white text-2xl text-center font-semibold">
              🎉 It&apos;s a result time! 🎊
            </h2>
            <div className="bg-white flex flex-col items-center justify-center my-8 p-8 gap-4 rounded-lg">
              <h2 className="text-xl font-semibold">
                Congratulations! You have scored
              </h2>
              <div className="bg-[var(--color-primary-100)] w-[150px] h-[150px] rounded-full flex flex-col items-center justify-center">
                <h2 className="text-white font-semiboldbold text-3xl">
                  {result.score}
                </h2>
                <p className="text-white">Out of {result.totalScore}</p>
              </div>
            </div>
            <div>
              {submissions.map((submission, index) => (
                <QuestionCard
                  key={index}
                  question={submission.question}
                  userAnswer={submission.answer}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default QuizResultPage
