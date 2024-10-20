
import React, { Dispatch, SetStateAction, useState } from 'react'
import { IQuizDetailsPayload } from '@/interfaces/payload'

interface QuzInfoProps {
  setActiveStep: Dispatch<SetStateAction<number>>
  setQuizDetails: Dispatch<SetStateAction<IQuizDetailsPayload | null>>
}

const QuizDetails = ({
  setActiveStep,
  setQuizDetails
}: QuzInfoProps) => {
  const [title, setTitle] = useState('')
  const [topic, setTopic] = useState('')
  const [totalQuestions, setTotalQuestions] = useState('')
  const [timePerQuestion, setTimePerQuestion] = useState('')
  const [difficulty, setDifficulty] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setQuizDetails({
      title,
      topic,
      difficulty,
      totalQuestions: parseInt(totalQuestions),
      timePerQuestion: parseInt(timePerQuestion),
    })
    setActiveStep(2)
  }

  return (
    <div className="w-[98%] sm:w-[400px] p-4 sm:p-8 border-t-2 border-[var(--color-primary-500)] shadow rounded-md bg-[var(--color-surface-mixed-400)] dark:bg-[var(--color-dark-surface-mixed)]">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-transparent leading-tight focus:outline-none focus:shadow-outline focus:border-[var(--color-primary-100)] dark:bg-[var(--color-dark-surface-500)] dark:border-gray-400 dark:text-gray-400"
            id="title"
            type="text"
            placeholder="Enter your quiz title"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="topic"
          >
            Topic
          </label>
          <input
            onChange={(e) => setTopic(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-transparent leading-tight focus:outline-none focus:shadow-outline focus:border-[var(--color-primary-100)] dark:bg-[var(--color-dark-surface-500)] dark:border-gray-400 dark:text-gray-400"
            id="topic"
            type="text"
            placeholder="Enter your quiz topic"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="topic"
          >
            Difficulty
          </label>
          <select
            onChange={(e) => setDifficulty(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-transparent leading-tight focus:outline-none focus:shadow-outline focus:border-[var(--color-primary-100)] dark:bg-[var(--color-dark-surface-500)] dark:border-gray-400 dark:text-gray-400"
            id="difficulty"
            required
          >
            <option value=''>Select difficulty</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="totalQuestions"
          >
            Total Questions
          </label>
          <input
            onChange={(e) => setTotalQuestions(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-transparent leading-tight focus:outline-none focus:shadow-outline focus:border-[var(--color-primary-100)] dark:bg-[var(--color-dark-surface-500)] dark:border-gray-400 dark:text-gray-400"
            id="totalQuestions"
            type="number"
            placeholder="eg. 5"
            min="0"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Time per question (in seconds)
          </label>
          <input
            onChange={(e) => setTimePerQuestion(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-transparent leading-tight focus:outline-none focus:shadow-outline focus:border-[var(--color-primary-100)] dark:bg-[var(--color-dark-surface-500)] dark:border-gray-400 dark:text-gray-400"
            id="username"
            type="number"
            placeholder="eg. 30"
            min="10"
            max="120"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveStep(0)}
            type="button"
            className="text-black text-md outline-none border border-gray-300 w-24 py-1 px-2 shadow hover:bg-black hover:text-white dark:text-gray-400 dark:border:text-gray-200"
          >
            Back
          </button>
          <button
            type="submit"
            className="text-black text-md outline-none border border-gray-300 w-24 py-1 px-2 shadow hover:bg-[var(--color-primary-300)] hover:text-white dark:text-gray-400 dark:hover:text-gray-200 dark:border:text-gray-200"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  )
}

export default QuizDetails
