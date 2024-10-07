import React from 'react'
import { IQuizQuestionPayload } from '@/interfaces/payload'


interface QuestionProps {
  question: IQuizQuestionPayload
  questionIndex: number
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
}

const Question = ({ question, questionIndex, handleChange }: QuestionProps) => {
  return (
    <div className="border border-gray-300 rounded-md p-6 mb-4">
      <div className="mb-4">
        <label
          className="block text-gray-500 text-sm font-bold mb-2"
          htmlFor="title"
        > 
          Question {questionIndex + 1}:
        </label>
        <input
          onChange={handleChange}
          defaultValue={question.questionText || ''}
          name={`question-${questionIndex}`}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-transparent leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder={`Type your question ${questionIndex + 1}`}
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
        {question.options.map((option, index) => {
          return (
            <div key={`${questionIndex}-${index}-${option.optionText}}`}>
              <input
                onChange={handleChange}
                name={`question-${questionIndex}-option-${option.optionNumber}`}
                defaultValue={option.optionText}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-transparent leading-tight focus:outline-none focus:shadow-outline"
                id={questionIndex + option.optionText}
                type="text"
                placeholder={`Option ${option.optionNumber}`}
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
          defaultValue={question.correctOption}
          onChange={handleChange}
          name={`question-${questionIndex}-correct-option`}
          className='outline-none border text-black bg-[var(--color-surface-mixed-200)]'
          required
        >
          <option value="">Select</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>
    </div>
  )
}

export default Question
