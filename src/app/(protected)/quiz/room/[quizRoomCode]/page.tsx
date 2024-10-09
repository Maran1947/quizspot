'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import Loading from '@/components/loading/loading'
import { IOption, IQuestion, IQuiz } from '@/interfaces/quiz'
import Timer from '../../../../../components/timer/timer'
import { useTimer } from 'react-timer-hook'
import toast from 'react-hot-toast'

const QuizRoomPage = () => {
  const { quizRoomCode } = useParams()
  const router = useRouter()

  const [quiz, setQuiz] = useState<IQuiz | null>(null)
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: IOption }>()
  const [selectedOption, setSeletedOption] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean | null>(null)
  const [submissionLoading, setSubmissionLoading] = useState(false)
  const [questionTimer, setQuestionTimer] = useState<Date | null>(null)

  const { seconds, minutes, restart, pause } = useTimer({
    expiryTimestamp: new Date(),
    onExpire: () => {
      if (quiz?.timePerQuestion) {
        setQuestionTimer(getTimerValue(quiz.timePerQuestion))
      }
    }
  })

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
    if (quiz?.totalQuestions && currentQuestion + 1 >= quiz.totalQuestions) {
      toast.success('Auto-submitting quiz...')
      handleSubmit()
      return
    }
    setSeletedOption(null)
    setCurrentQuestion(currentQuestion + 1)
    if (quiz?.timePerQuestion) {
      restart(getTimerValue(quiz.timePerQuestion))
    }
  }

  const handleSubmit = async () => {
    setSubmissionLoading(true)
    try {
      console.log({ answers })
      const data = {
        quizId: quizRoomCode,
        answers
      }
      console.log(data)
      const response = await axios.post('/api/quiz/submission', data)
      if (response.status === 200) {
        pause()
        router.push(`/quiz/result/${quiz!._id}`)
      }
    } catch (error) {
      console.log(error)
      alert(error)
    } finally {
      setSubmissionLoading(false)
    }
  }

  const getTimerValue = (timePerQuestion: number) => {
    const time = new Date()
    time.setSeconds(time.getSeconds() + timePerQuestion)
    return time
  }

  const getQuiz = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/quiz/${quizRoomCode}`)
      if (response.status === 200) {
        console.log(response.data)
        setQuiz(response.data.quiz)
        setQuestions(response.data.questions)
        setCurrentQuestion(0)
        restart(getTimerValue(response.data.quiz.timePerQuestion))
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        alert('Quiz not found!')
        router.push('/quiz/join')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (quizRoomCode) {
      getQuiz()
    }
  }, [])

  useEffect(() => {
    handleContinue()
  }, [questionTimer])
  return (
    <div className="w-full pt-20 h-screen bg-[var(--color-surface-mixed-200)]">
      {questions.length > 0 ? (
        <div className="max-w-[800px] p-8 mx-8 md:mx-auto border border-[var(--color-primary-100)] rounded-[50px] shadow-md">
          <div className="flex justify-between items-center">
            <div className="text-[var(--color-primary-200)] text-lg">
              <span className="font-semibold">{currentQuestion + 1}</span> of{' '}
              <span className="font-semibold">{quiz?.totalQuestions}</span>{' '}
              questions
            </div>
            <Timer minutes={minutes} seconds={seconds} />
          </div>

          <h2 className="text-white p-4 text-2xl flex gap-4 bg-[var(--color-primary-100)] rounded-lg">
            <span className="font-medium">Q. </span>
            <span>{questions[currentQuestion].questionText}</span>
          </h2>
          <div className="flex flex-col gap-4 mt-8 text-[var(--color-primary-400)]">
            {questions[currentQuestion].options.map((option, index) => {
              return (
                <p
                  onClick={() => handleOptionClick(option)}
                  key={index}
                  className={`cursor-pointer flex items-center gap-6 py-3 px-4 border border-[#deb8ff] rounded-md hover:bg-[var(--color-primary-200)] hover:text-white ${
                    selectedOption === option.optionNumber
                      ? 'bg-[var(--color-primary-200)] text-white'
                      : ''
                  }`}
                >
                  <span className="min-w-[24px] min-h-[24px] flex items-center rounded-sm justify-center border border-[#deb8ff] hover:text-[#deb8ff]">
                    {option.optionNumber}
                  </span>
                  <span className="text-xl font-medium">
                    {option.optionText}
                  </span>
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
              {currentQuestion === quiz!.totalQuestions - 1 ? (
                submissionLoading ? (
                  <Loading type="spin" color="#fff" width={24} height={24} />
                ) : (
                  'Submit'
                )
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </div>
      ) : loading || loading === null ? (
        <div className="pt-40 flex flex-col gap-4 items-center justify-center">
          <Loading
            type="spinningBubbles"
            color="#dd92e4"
            width={150}
            height={150}
          />
          <p className="font-semibold animate-pulse">
            Preparing quiz questions for you!
          </p>
        </div>
      ) : (
        <div className="pt-40 flex flex-col gap-4 items-center justify-center">
          <p className="font-semibold text-xl">
            Oops, The quiz is not prepared yet!
          </p>
          <Link
            className="bg-[var(--color-primary-500)] shadow-md hover:shadow-none px-6 py-1 rounded-full"
            href="/quiz/join"
          >
            Go back
          </Link>
        </div>
      )}
    </div>
  )
}

export default QuizRoomPage
