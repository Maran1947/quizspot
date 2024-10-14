import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Question from './question'
import { generateQuestionsTemplate } from '@/utils/questionTemplate'
import axios from 'axios'
import { IQuizDetailsPayload, IQuizQuestionPayload } from '@/interfaces/payload'
import toast from 'react-hot-toast'
import Loading from '@/components/loading/loading'
import AiLoading from '@/components/loading/aiLoading'

interface GenerateQuizProps {
  generateQuizType: string
  quizDetails: IQuizDetailsPayload | null
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
  const [quizQuestions, setQuizQuestions] = useState<IQuizQuestionPayload[]>([])
  const [loading, setLoading] = useState(false)
  const [questionsLoading, setQuestionsLoading] = useState(false)

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
    let quizData

    if (generateQuizType === 'ai') {
      quizData = {
        quizType: generateQuizType,
        quizDetails,
        quizQuestions
      }
    } else {
      if (quizQuestionsFormData === null) {
        toast.error('Please fill all questions!')
        return
      }
      quizData = {
        quizType: generateQuizType,
        quizDetails,
        quizQuestions: Array.from({ length: quizDetails?.totalQuestions || 0 })
          .map((_, index): IQuizQuestionPayload | null => {
            const questionIndex = index
            const questionPrefix = `question-${questionIndex}`
            if (!quizQuestionsFormData[questionPrefix]) {
              return null
            }
            return {
              questionNumber: questionIndex,
              questionText: quizQuestionsFormData[questionPrefix],
              correctOption:
                quizQuestionsFormData[`${questionPrefix}-correct-option`],
              options: ['A', 'B', 'C', 'D'].map((optionIndex) => {
                return {
                  id: `${questionPrefix}-option-${optionIndex}`,
                  optionText:
                    quizQuestionsFormData[
                      `${questionPrefix}-option-${optionIndex}`
                    ],
                  optionNumber: optionIndex
                }
              })
            }
          })
          .filter((question) => question !== null)
      }
    }

    console.log({ quizQuestionsFormData, quizData })

    setLoading(true)
    try {
      const response = await axios.post('/api/quiz/create', { data: quizData })
      if (response.status === 200) {
        setQuizRoomCode(response.data.quizId)
        setActiveStep(3)
      }
    } catch (error) {
      console.log('Error occurred in creating quiz: ', error)
    } finally {
      setLoading(false)
    }
  }

  const getGeneratedQuestionsFromAI = async () => {
    const data = {
      quizDetails
    }
    setQuestionsLoading(true)
    try {
      const response = await axios.post('/api/quiz/generate', data)
      if (response.status === 200) {
        const generatedQuestions = response.data.generatedQuestions
        setQuizQuestions(generatedQuestions)
      }
    } catch (error) {
      console.log(error)
      alert(error)
    } finally {
      setQuestionsLoading(false)
    }
  }

  useEffect(() => {
    if (generateQuizType === 'ai') {
      getGeneratedQuestionsFromAI()
    } else {
      setQuizQuestions(
        generateQuestionsTemplate(quizDetails?.totalQuestions || 0)
      )
    }
  }, [generateQuizType, quizDetails])

  return (
    <div className="w-full h-[500px] flex flex-col items-center">
      <form className="w-[95%]" onSubmit={handleSubmit}>
        <div className="text-black text-xl border-t-2 border-[var(--color-primary-500)] shadow rounded-md bg-[var(--color-surface-mixed-400)] py-3 px-6 mb-4">
          {quizDetails?.title}
        </div>
        <div className="h-[400px] overflow-y-auto p-6 border-t-2 border-[var(--color-primary-500)] shadow rounded-md bg-[var(--color-surface-mixed-400)]">
          {questionsLoading ? (
            <AiLoading />
          ) : (
            quizQuestions.map((question, index) => {
              return (
                <Question
                  key={`${question}-${index}`}
                  question={question}
                  questionIndex={index}
                  handleChange={handleChange}
                />
              )
            })
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setActiveStep(1)}
            type="button"
            className="text-black text-md outline-none border border-gray-300 w-24 py-1 px-2 shadow hover:bg-[black] hover:text-white"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex items-center justify-center text-black text-md outline-none border border-gray-300 w-24 py-1 px-2 shadow hover:bg-[var(--color-primary-300)] hover:text-white"
          >
            {loading ? (
              <Loading
                type="spin"
                color="var(--color-primary-300)"
                width={24}
                height={24}
              />
            ) : (
              'Create'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default GenerateQuiz
