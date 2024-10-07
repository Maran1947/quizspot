'use client'
import SkeletonLoading from '@/components/loading/skeletonLoading'
import axios from 'axios'
import Link from 'next/link'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaEdit, FaEye } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

interface QuizCardProps {
  quiz: {
    _id: string
    title: string
    topic: string
    totalQuestions: number
    createdAt: string
  },
  setRefresh: Dispatch<SetStateAction<boolean>>
}

const QuizCard = ({ quiz, setRefresh }: QuizCardProps) => {

  const handleDeleteQuiz = async () => {
      try {
        const response = await axios.delete(`/api/quiz/${quiz._id}`)
        if (response.status === 200) {
          setRefresh(true)
          toast.success('Quiz deleted successfully!')
        }
      } catch (error) {
        console.log(error)
        alert(error)
      }
  }

  return (
    <div className="border-t-2 border-[var(--color-primary-500)] bg-[var(--color-surface-mixed-200)] px-4 py-6 text-gray-100 rounded-[15px] shadow-[0px_1px_10px_0px_#0000001a] hover:shadow-[0px_1px_10px_3px_#0000001a] transition-shadow">
      <h2 className="font-semibold text-xl text-[var(--color-primary-500)] border-l-2 border-[var(--color-primary-500)] pl-2 py-1">
        {quiz.title}
      </h2>
      <div className='py-1 px-2 mt-4' >
        <div className="flex items-center justify-between">
          <p className="text-sm text-black">Questions: {quiz.totalQuestions}</p>
          <p className="text-black">
            Created At: {new Date(quiz.createdAt).toLocaleDateString()}
          </p>
        </div>
        <p className="text-black">Topic: {quiz.topic}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="text-black flex gap-2 items-center">
          <FaEdit className="cursor-pointer text-lg text-[var(--color-primary-200)] hover:text-[var(--color-primary-400)]" />
          <MdDelete onClick={handleDeleteQuiz} className="cursor-pointer text-lg text-[var(--color-primary-200)] hover:text-[var(--color-primary-400)]" />
        </div>
        <Link
          href={`/dashboard/quiz/${quiz._id}/view`}
          className="text-lg text-[var(--color-primary-200)] hover:text-[var(--color-primary-400)]"
        >
          <FaEye />
        </Link>
      </div>
    </div>
  )
}

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const getUserQuizzes = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/quiz/all')
      if (response.status === 200) {
        console.log({ quizzes: response.data.quizzes })
        setQuizzes(response.data.quizzes)
      }
    } catch (error) {
      console.log(error)
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserQuizzes()
  }, [])

  useEffect(() => {
    if (refresh) {
      getUserQuizzes()
      setRefresh(false)
    }
  }, [refresh])

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {loading
          ? [1, 2, 3, 4, 5, 6, 7].map((index) => (
              <SkeletonLoading key={index} />
            ))
          : quizzes.map(
              (
                quiz: {
                  title: string
                  topic: string
                  createdAt: string
                  _id: string
                  totalQuestions: number
                },
                index

              ) => <QuizCard key={index} quiz={quiz} setRefresh={setRefresh} />
            )}
      </div>

      {!loading && quizzes.length === 0 && (
        <div className="w-full h-[400px] flex items-center justify-center">
          <h2 className="text-2xl text-gray-500 font-medium">No quiz found.</h2>
        </div>
      )}
    </div>
  )
}

export default QuizPage
