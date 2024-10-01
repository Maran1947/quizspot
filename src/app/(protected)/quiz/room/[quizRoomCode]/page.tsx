'use client'

import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface IOption {
  id: string
  _id: string
  value: string
  optionNumber: number
}

interface IQuestion {
  _id: string
  question: string
  createdAt: string
  quizId: string
  options: IOption[]
}

interface IQuiz {
  _id: string
  totalQuestions: number
  quizType: string
  timePerQuestion: number
}

const QuizRoomPage = () => {
  const { quizRoomCode } = useParams()
  const router = useRouter()

  const [quiz, setQuiz] = useState<IQuiz | null>(null)
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: IOption }>()
  const [selectedOption, setSeletedOption] = useState<number | null>(null)

  const handleOptionClick = (option: IOption) => {
    setSeletedOption(option.optionNumber)
    setAnswers((prevAnswer) => {
      return {
        ...prevAnswer,
        [questions[currentQuestion]._id]: option
      }
    })
  }

  const handleContinue = () => {
    setSeletedOption(null)
    setCurrentQuestion(currentQuestion + 1)
  }

  const handleSubmit = async () => {
    try {
      console.log({ answers })
      const data = {
        quizId: quizRoomCode,
        answers
      }
      console.log(data)
      const response = await axios.post('/api/quiz/submission', data)
      if (response.status === 200) {
        router.push(`/quiz/result/${quiz!._id}`)
      }
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  const getQuiz = async () => {
    try {
      const response = await axios.get(`/api/quiz/${quizRoomCode}`)
      if (response.status === 200) {
        console.log(response.data)
        setQuiz(response.data.quiz)
        setQuestions(response.data.questions)
        setCurrentQuestion(0)
      }
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  useEffect(() => {
    if (quizRoomCode) {
      getQuiz()
    }
  }, [])
  return (
    <div className="w-full h-screen bg-[var(--color-surface-mixed-200)]">
      {questions.length > 0 ? (
        <div className="w-[800px] mx-auto pt-20">
          <h2 className="text-[var(--color-primary-400)] p-4 text-2xl flex gap-4 border border-[#deb8ff] rounded-md">
            <span className="font-medium">Q{currentQuestion + 1}. </span>
            <span>{questions[currentQuestion].question}</span>
          </h2>
          <div className="flex flex-col gap-4 mt-8 text-[var(--color-primary-400)]">
            {questions[currentQuestion].options.map((option) => {
              return (
                <p
                  onClick={() => handleOptionClick(option)}
                  key={option._id}
                  className={`cursor-pointer flex items-center gap-6 py-3 px-4 border border-[#deb8ff] rounded-md hover:bg-[var(--color-primary-100)] hover:text-white ${
                    selectedOption === option.optionNumber
                      ? 'bg-[var(--color-primary-100)] text-white'
                      : ''
                  }`}
                >
                  <span className="min-w-[24px] min-h-[24px] flex items-center rounded-sm justify-center border border-[#deb8ff] hover:text-[#deb8ff]">
                    {option.optionNumber + 1}
                  </span>
                  <span className="text-xl font-medium">{option.value}</span>
                </p>
              )
            })}
          </div>
          <div className="flex item-center justify-end mt-8">
            <button
              onClick={
                currentQuestion === quiz!.totalQuestions - 1
                  ? handleSubmit
                  : handleContinue
              }
              type="button"
              className="flex items-center gap-2 text-white bg-[var(--color-primary-200)] font-medium px-10 py-2 rounded-md ml-2"
            >
              {currentQuestion === quiz!.totalQuestions - 1
                ? 'Submit'
                : 'Continue'}
            </button>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  )
}

export default QuizRoomPage
