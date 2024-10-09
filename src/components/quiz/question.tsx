import { IQuestion } from '@/interfaces/quiz'
import React from 'react'

interface QuestionCardProps {
    question: IQuestion
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <div
      key={question._id}
      className="bg-[var(--color-surface-mixed-500)] mb-4 shadow-md rounded-tl-lg rounded-tr-lg"
    >
      <h3 className="mb-3 bg-[var(--color-primary-100)] p-3 rounded-tl-lg rounded-tr-lg text-white">
        Q{question.questionNumber + 1 + '. ' + question.questionText}
      </h3>
      <div className="p-3">
        {question.options.map((option) => {
          return (
            <div key={option.id} className="flex items-center gap-2 mb-2">
              <span
                className={`flex items-center justify-center min-w-[24px] h-[24px] border border-gray-400 ${
                  question.correctOption === option.optionNumber
                    ? 'border-green-400 bg-green-200'
                    : 'border-gray-400'
                }`}
              >
                {option.optionNumber}
              </span>
              <span
                className={
                  question.correctOption === option.optionNumber
                    ? 'bg-green-200'
                    : ''
                }
              >
                {option.optionText}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default QuestionCard
