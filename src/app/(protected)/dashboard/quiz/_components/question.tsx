import { IQuizQuestion } from '@/interfaces/quiz'
import React from 'react'

interface QuestionProps {
  question: IQuizQuestion
  index: number
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
}

const Question = ({ question, index, handleChange }: QuestionProps) => {
  return (
    <div className="border border-gray-300 rounded-md p-6 mb-4">
      <div className="mb-4">
        <label
          className="block text-gray-500 text-sm font-bold mb-2"
          htmlFor="title"
        > 
          Question {index + 1}:
        </label>
        <input
          onChange={handleChange}
          defaultValue={''}
          name={`question-${index}`}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-transparent leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder={`Type your question ${index + 1}`}
          required
        />
      </div>
      <label
        className="block text-gray-500 text-sm font-bold mb-2"
        htmlFor="title"
      >
        Option:
      </label>
      <div className="grid grid-cols-2 gap-2">
        {question.options.map((option) => {
          return (
            <div key={option.id}>
              <input
                onChange={handleChange}
                name={option.id}
                defaultValue={''}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-transparent leading-tight focus:outline-none focus:shadow-outline"
                id={option.id}
                type="text"
                placeholder={`Option ${option.optionNumber + 1}`}
                required
              />
            </div>
          )
        })}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <label
          className="block text-gray-500 text-sm font-bold"
          htmlFor="title"
        >
          Correct Option:
        </label>
        <select
          defaultValue={""}
          onChange={handleChange}
          name={`question-${index}-correct-option`}
          className='outline-none border text-gray-400 bg-[var(--color-surface-mixed-200)]'
          required
        >
          <option value="">Select</option>
          <option value={0}>A</option>
          <option value={1}>B</option>
          <option value={2}>C</option>
          <option value={3}>D</option>
        </select>
      </div>
    </div>
  )
}

export default Question
