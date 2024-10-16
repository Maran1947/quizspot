'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import SkeletonLoading from '@/components/loading/skeletonLoading'
import QuizCard from './_components/quizCard'
import { IQuiz, IQuizAttemptsGroup } from '@/interfaces/quiz'

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [filterBy, setFilterBy] = useState('created')


  const handleFilterBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(e.target.value)
    setQuizzes([])
  }

  const getUserQuizzes = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/quiz/all', {
        params: { filterBy }
      })
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
  }, [filterBy])

  useEffect(() => {
    if (refresh) {
      getUserQuizzes()
      setRefresh(false)
    }
  }, [refresh])

  return (
    <div className="w-full p-4 sm:p-8">
      <div className="w-full flex items-center justify-between">
        <div>
          <select
            value={filterBy}
            onChange={handleFilterBy}
            className="border-2 border-[var(--color-primary-500)] bg-[var(--color-surface-mixed-400)] text-black shadow focus:outline-none rounded-full px-2 py-1.5 text-xl font-medium"
          >
            <option value="created">Created</option>
            <option value="attempted">Attempted</option>
          </select>
        </div>
        <Link
          href={'/dashboard/quiz/create'}
          className="text-center text-black text-sm sm:text-base border font-medium border-gray-300 bg-[var(--color-primary-500)] shadow-[0px_1px_10px_0px_#0000001a] px-4 sm:px-6 py-2 rounded-[50px]"
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
              (quiz: IQuiz | IQuizAttemptsGroup, index) => (
                <QuizCard
                  key={index}
                  quiz={
                    filterBy === 'created'
                      ? (quiz as IQuiz)
                      : (quiz as IQuizAttemptsGroup).quiz
                  }
                  attempts={(quiz as IQuizAttemptsGroup)?.attempts || []}
                  isCreated={filterBy === 'created'}
                  setRefresh={setRefresh}
                />
              )
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
