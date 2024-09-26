import React, { Dispatch, SetStateAction } from 'react'

interface QuzInfoProps {
  setActiveStep: Dispatch<SetStateAction<number>>
}

const QuizDetails = ({ setActiveStep }: QuzInfoProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setActiveStep(2)
  }

  return (
    <div className="w-96 p-8 border border-gray-300 shadow rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter your quiz title"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="topic"
          >
            Topic
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="topic"
            type="text"
            placeholder="Enter your quiz topic"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="totalQuestions"
          >
            Total Questions
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="totalQuestions"
            type="number"
            placeholder="eg. 5"
            min="0"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Time per question
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="text-md outline-none border border-gray-300 w-24 py-1 px-2 shadow hover:bg-black hover:text-white"
          >
            Back
          </button>
          <button
            type="submit"
            className="text-md outline-none border border-gray-300 w-24 py-1 px-2 shadow hover:bg-black hover:text-white"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  )
}

export default QuizDetails
