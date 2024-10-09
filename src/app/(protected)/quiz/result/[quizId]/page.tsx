'use client'

import QuestionCard from '@/components/quiz/question'
import { IQuestion } from '@/interfaces/quiz'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const QuizResultPage = () => {
  const { quizId } = useParams()
  const [questions, setQuestions] = useState<IQuestion[]>([
    {
      _id: 'string',
      quiz: 'string',
      questionNumber: 1,
      questionText: 'string',
      correctOption: 'A',
      options: [
        {
          id: 'string',
          optionText: 'string',
          optionNumber: 'A'
        },
        {
          id: 'string',
          optionText: 'string',
          optionNumber: 'B'
        },
        {
          id: 'string',
          optionText: 'string',
          optionNumber: 'C'
        },
        {
          id: 'string',
          optionText: 'string',
          optionNumber: 'D'
        }
      ]
    }
  ])

  const getUserQuizResult = async () => {
    try {
      const response = await axios.get(`/api/quiz/result/${quizId}`)
      if (response.status === 200) {
        console.log(response.data)
        setQuestions([])
      }
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  useEffect(() => {
    if (quizId) {
      getUserQuizResult()
    }
  }, [])

  return (
    <div className="w-full h-screen bg-[var(--color-surface-mixed-100)] py-8">
      <div className="bg-[var(--color-primary-500)] max-w-[600px] mx-auto rounded-2xl p-4">
        <h2 className="text-white text-2xl text-center font-semibold">
          🎉 It&apos;s a result time! 🎊
        </h2>
          <div className='bg-white flex flex-col items-center justify-center my-8 p-8 gap-4 rounded-lg'>
            <h2 className='text-xl font-semibold'>Congratulations! You have scored</h2>
            <div className='bg-[var(--color-primary-100)] w-[150px] h-[150px] rounded-full flex flex-col items-center justify-center'>
                <h2 className='text-white font-semiboldbold text-3xl'>80</h2>
                <p className='text-white'>Out of 100</p>
            </div>
          </div>
        <div>
          {questions.map((question, index) => (
            <QuestionCard key={index} question={question} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuizResultPage
