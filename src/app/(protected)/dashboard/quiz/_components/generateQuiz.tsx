import { IQuizDetails, IQuizQuestion } from '@/interfaces/quiz'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Question from './question'
import { generateQuestionsTemplate } from '@/utils/questionTemplate'
import axios from 'axios'

interface GenerateQuizProps {
  generateQuizType: string
  quizDetails: IQuizDetails | null
  setActiveStep: Dispatch<SetStateAction<number>>
  setQuizRoomCode: Dispatch<SetStateAction<string | null>>
}

const GenerateQuiz = ({
  generateQuizType,
  setActiveStep,
  quizDetails,
  setQuizRoomCode
}: GenerateQuizProps) => {
  const [quizQuestionsFormData, setQuizQuestionsFormData] = useState<{
    [key: string]: string
  } | null>(null)
  const [quizQuestions, setQuizQuestions] = useState<IQuizQuestion[]>([])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setQuizQuestionsFormData((prevQuizQuestions) => {
      return {
        ...prevQuizQuestions,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (quizQuestionsFormData === null) {
      alert('Please filled all questions!')
      return
    }
    const quizData = {
      quizType: generateQuizType,
      quizDetails,
      quizQuestions: Array.from({ length: quizDetails?.totalQuestions || 0 })
        .map((_, index): IQuizQuestion | null => {
          const questionIndex = index
          const questionPrefix = `question-${questionIndex}`
          if (!quizQuestionsFormData[questionPrefix]) {
            return null
          }
          return {
            questionNumber: questionIndex,
            question: quizQuestionsFormData[questionPrefix],
            correctOption:
              quizQuestionsFormData[`${questionPrefix}-correct-option`],
            options: ['a', 'b', 'c', 'd'].map((optionIndex, index) => {
              return {
                id: `${questionPrefix}-option-${optionIndex}`,
                value:
                  quizQuestionsFormData[
                    `${questionPrefix}-option-${optionIndex}`
                  ],
                optionNumber: index
              }
            })
          }
        })
        .filter((question) => question !== null)
    }

    console.log({ quizQuestionsFormData, quizData })

    try {
      const response = await axios.post('/api/quiz/create', { data: quizData })
      if (response.status === 200) {
        setQuizRoomCode(response.data.quizId)
        setActiveStep(3)
      }
    } catch (error) {
      console.log('Error occurred in creating quiz: ', error)
    }
  }

  useEffect(() => {
    if (generateQuizType === 'ai')
      setQuizQuestions(generateQuestionsTemplate(1))
    else
      setQuizQuestions(
        generateQuestionsTemplate(quizDetails?.totalQuestions || 0)
      )
  }, [generateQuizType, quizDetails])

  return (
    <div className="w-full h-[500px] flex flex-col items-center">
      <form className="w-[80%]" onSubmit={handleSubmit}>
        <div className="text-black text-xl border border-gray-300 py-2 px-6 mb-4">
          {quizDetails?.title}
        </div>
        <div className="h-[400px] overflow-y-auto p-6 border border-gray-300">
          {quizQuestions.map((question, index) => {
            return (
              <Question
                key={`${question}-${index}`}
                question={question}
                index={index}
                handleChange={handleChange}
              />
            )
          })}
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setActiveStep(1)}
            type="button"
            className="text-black text-md outline-none border border-gray-300 w-24 py-1 px-2 shadow hover:bg-black hover:text-white"
          >
            Back
          </button>
          <button
            type="submit"
            className="text-black text-md outline-none border border-gray-300 w-24 py-1 px-2 shadow hover:bg-black hover:text-white"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default GenerateQuiz
