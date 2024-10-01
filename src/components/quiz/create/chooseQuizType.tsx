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
    <div className="flex items-center justify-center gap-8">
      <div className="w-80 h-80 flex flex-col items-center justify-center gap-6 border border-gray-300 shadow rounded-md">
        <Image
          src={customQuizGif}
          alt="Custom Quiz Gif"
          width={120}
          height={120}
        />
        <button
          type="button"
          className="text-black text-lg outline-none border border-gray-300 w-40 py-1 px-2 shadow hover:bg-black hover:text-white"
          onClick={() => handleGenerateQuizType('custom')}
        >
          Custom Quiz
        </button>
      </div>
      <div className="w-80 h-80 flex flex-col items-center justify-center gap-6 border border-gray-300 shadow rounded-md">
        <Image src={aiQuizGif} alt="AI Quiz Gif" width={120} height={120} />
        <button
          type="button"
          className="text-black text-lg outline-none border border-gray-300 w-40 py-1 px-2 shadow hover:bg-black hover:text-white"
          onClick={() => handleGenerateQuizType('ai')}
        >
          AI Quiz
        </button>
      </div>
    </div>
  )
}

export default ChooseQuizType
