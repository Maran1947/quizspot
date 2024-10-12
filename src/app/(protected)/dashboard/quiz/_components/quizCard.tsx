import axios from 'axios'
import Link from 'next/link'
import React, { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'
import { FaEdit, FaEye } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

interface QuizCardProps {
  quiz: {
    id: string
    title: string
    topic: string
    totalQuestions: number
    createdAt: string
  }
  setRefresh: Dispatch<SetStateAction<boolean>>
}

const QuizCard = ({ quiz, setRefresh }: QuizCardProps) => {
  const handleDeleteQuiz = async () => {
    try {
      const response = await axios.delete(`/api/quiz/${quiz.id}`)
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
    <div className="border-t-2 border-[var(--color-primary-500)] bg-[var(--color-surface-mixed-400)] px-4 py-6 text-gray-100 rounded-[15px] shadow-[0px_1px_10px_0px_#0000001a] hover:shadow-[0px_1px_10px_3px_#0000001a] transition-shadow">
      <h2 className="font-semibold text-xl text-[var(--color-primary-100)] bg-[#e9d9f7] pl-2 py-1">
        {quiz.title}
      </h2>
      <div className="py-1 mt-2 px-2">
          <p className="text-md text-[var(--color-primary-500)] mb-2">{quiz.topic}</p>
        <div className="flex items-center flex-wrap gap-2">
          <p className="text-sm text-[var(--color-primary-500)] px-2 bg-[#f8ebfd]">
            {quiz.totalQuestions} Qs
          </p>
          <p className="text-[var(--color-primary-500)] bg-[#f8ebfd] px-2">
            {new Date(quiz.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="text-black flex gap-2 items-center">
          <FaEdit className="cursor-pointer text-lg text-[var(--color-primary-200)] hover:text-[var(--color-primary-400)]" />
          <MdDelete
            onClick={handleDeleteQuiz}
            className="cursor-pointer text-lg text-[var(--color-primary-200)] hover:text-[var(--color-primary-400)]"
          />
        </div>
        <Link
          href={`/dashboard/quiz/${quiz.id}/view`}
          className="text-lg text-[var(--color-primary-200)] hover:text-[var(--color-primary-400)]"
        >
          <FaEye />
        </Link>
      </div>
    </div>
  )
}

export default QuizCard
