'use client'
import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import customQuizGif from '../../../assets/gif/custom_quiz.gif'
import aiQuizGif from '../../../assets/gif/ai_quiz_generate.gif'

interface GenerateQuizProps {
  setGenerateQuizType: Dispatch<SetStateAction<string>>
  setActiveStep: Dispatch<SetStateAction<number>>
}

const ChooseQuizType = ({
  setGenerateQuizType,
  setActiveStep
}: GenerateQuizProps) => {
  const handleGenerateQuizType = (quizType: string) => {
    setGenerateQuizType(quizType)
    setActiveStep(1)
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
      <div className="max-w-80 max-h-80 flex flex-col items-center justify-center gap-6 border-t-2 border-[var(--color-primary-500)] shadow rounded-md bg-[var(--color-surface-mixed-400)]">
        <Image
          src={customQuizGif}
          alt="Custom Quiz Gif"
          width={120}
          height={120}
        />
        <button
          type="button"
          className="text-black text-lg outline-none border border-gray-300 w-40 py-1 px-2 shadow hover:bg-[var(--color-primary-300)] hover:text-white"
          onClick={() => handleGenerateQuizType('custom')}
        >
          Custom Quiz
        </button>
      </div>
      <div className="max-w-80 max-h-80 flex flex-col items-center justify-center gap-6 border-t-2 border-[var(--color-primary-500)] shadow rounded-md bg-[var(--color-surface-mixed-400)]">
        <Image src={aiQuizGif} alt="AI Quiz Gif" width={120} height={120} />
        <button
          type="button"
          className="text-black text-lg outline-none border border-gray-300 w-40 py-1 px-2 shadow hover:bg-[var(--color-primary-300)] hover:text-white"
          onClick={() => handleGenerateQuizType('ai')}
        >
          AI Quiz
        </button>
      </div>
    </div>
  )
}

export default ChooseQuizType
