'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([])
  const getUserQuizzes = async () => {
    try {
      const response = await axios.get('/api/quiz/all')
      if (response.status === 200) {
        console.log({ quizzes: response.data.quizzes })
        setQuizzes(response.data.quizzes)
      }
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  useEffect(() => {
    getUserQuizzes()
  }, [])

  return (
    <div className="w-full p-8">
      <div className="w-full flex items-center justify-between">
        <div className="text-black text-2xl font-medium">Manage Quizzes</div>
        <Link
          href={'/dashboard/quiz/create'}
          className="text-black border font-medium border-gray-300 bg-[var(--color-primary-500)] shadow-[0px_1px_10px_0px_#0000001a] px-6 py-2 rounded-[50px]"
        >
          Create Quiz
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {quizzes.map(
          (
            quiz: {
              title: string
              topic: string
              createdAt: string
              _id: string
              totalQuestions: number
            },
            index
          ) => {
            return (
              <div
                key={index}
                className="bg-[var(--color-surface-mixed-200)] p-4 text-gray-100 rounded-[15px] shadow-[0px_1px_10px_0px_#0000001a] hover:shadow-[0px_1px_10px_2px_#0000001a] transition-shadow"
              >
                <h2 className="text-xl text-black">{quiz.title}</h2>
                <p className="text-black font-semibold text-sm flex items-center gap-1 rounded-[50px] bg-[#dab2fd] py-1 px-2">
                  <span className="w-[24px] h-[24px] text-white flex items-center justify-center bg-[var(--color-primary-400)] rounded-full">
                    {quiz.totalQuestions}
                  </span>{' '}
                  questions
                </p>
                <p className="text-black">{quiz.topic}</p>
                <p className="text-black">{quiz.createdAt}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className=""></div>
                  <Link
                    href={`/dashboard/quiz/${quiz._id}/view`}
                    className="text-black bg-[var(--color-primary-500)] px-5 py-1 rounded-[50px]"
                  >
                    View
                  </Link>
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}

export default QuizPage
