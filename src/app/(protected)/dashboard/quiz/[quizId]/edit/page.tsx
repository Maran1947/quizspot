'use client'
import SubmitButton from '@/components/button/submitButton'
import Loading from '@/components/loading/loading'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { IQuestion } from '@/interfaces/quiz'

const QuizEditPage = () => {
  const [quizQuestionsFormData, setQuizQuestionsFormData] = useState<{
    [key: string]: string
  } | null>(null)
  const [quizId, setQuizId] = useState('')
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [topic, setTopic] = useState('')
  const [totalQuestions, setTotalQuestions] = useState('')
  const [timePerQuestion, setTimePerQuestion] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [isRefresh, setIsRefresh] = useState(false)
  const [quizUpdateLoading, setQuizUpdateLoading] = useState(false)
  const [questionUpdateLoading, setQuestionUpdateLoading] = useState<string>('')

  const params = useParams()

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

  const handleUpdateQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const questionId = e.currentTarget.getAttribute('data-question-id')
    const questionNumber = e.currentTarget.getAttribute('data-question-number')

    setQuestionUpdateLoading(questionId!)
    try {
      const questionPrefix = `question-${questionId}`
      if (quizQuestionsFormData === null) {
        toast('No changes detected!', {
          icon: '🔔'
        })
        return
      }

      if (!quizQuestionsFormData[questionPrefix]) {
        return
      }

      let existingQuestion: IQuestion | null = null
      for (const question of questions) {
        if (question.id === questionId) {
          existingQuestion = question
        }
      }

      const updatedQuestion = {
        questionNumber: parseInt(questionNumber!),
        questionText: quizQuestionsFormData[questionPrefix] || existingQuestion?.questionText,
        correctOption:
          quizQuestionsFormData[`${questionPrefix}-correct-option`] || existingQuestion?.correctOption,
        options: existingQuestion?.options.map((option, optionIndex) => {
          return quizQuestionsFormData [
            `${questionPrefix}-option-${optionIndex}`
          ] ? {
            id: `${questionPrefix}-option-${optionIndex}`,
            optionText:
              quizQuestionsFormData[
                `${questionPrefix}-option-${optionIndex}`
              ],
            optionNumber: optionIndex
          } : option
        })
      }

      const response = await axios.put(`/api/quiz/question/${questionId}/update`, { quizId,updatedQuestion })
      if (response.status === 200) {
        toast.success(response.data.message)
        setIsRefresh(true)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setQuestionUpdateLoading('')
    }
  }

  const handleUpdateQuizDetails = async (e: React.FormEvent) => {
    e.preventDefault()
    setQuizUpdateLoading(true)
    try {
      const updatedQuizDetails = {
        title,
        topic,
        difficulty,
        totalQuestions: parseInt(totalQuestions),
        timePerQuestion: parseInt(timePerQuestion)
      }
      const response = await axios.put(`/api/quiz/${quizId}/update`, {
        updatedQuizDetails
      })
      if (response.status === 200) {
        toast.success(response.data.message)
        setIsRefresh(true)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setQuizUpdateLoading(false)
    }
  }

  const getQuiz = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/quiz/${params.quizId}`)
      if (response.status === 200) {
        setQuestions(response.data.questions)
        const quiz = response.data.quiz
        setQuizId(quiz.id)
        setTitle(quiz.title)
        setTopic(quiz.topic)
        setDifficulty(quiz.difficulty)
        setTotalQuestions(quiz.totalQuestions)
        setTimePerQuestion(quiz.timePerQuestion)
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        toast.error('Quiz not found!')
      } else {
        toast.error('Something went wrong!')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.quizId) {
      getQuiz()
    }
  }, [])

  useEffect(() => {
    if (isRefresh) {
      getQuiz()
    }
  }, [isRefresh])

  return (
    <div className="w-full p-4 sm:p-8">
      {loading ? (
        <div>
          <Loading
            type="bubbles"
            color="var(--color-primary-100)"
            width={100}
            height={100}
          />
        </div>
      ) : (
        <div>
          <div className="mb-8 p-4 sm:p-8 border-t-2 border-[var(--color-primary-500)] shadow rounded-md bg-[var(--color-surface-mixed-400)] dark:bg-[var(--color-dark-surface-mixed)]">
            <form method="post" onSubmit={handleUpdateQuizDetails}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-2xl mb-4 dark:text-gray-400">Edit Quiz Details</h2>
                <SubmitButton
                  label="Update"
                  className="w-28"
                  isLoading={quizUpdateLoading}
                />
              </div>
              <div>
                <div className="mb-4">
                  <label
                    className="block text-gray-400 text-sm font-bold mb-1"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block py-3 px-4 mb-3 appearance-none border border-[var(--color-primary-500)] rounded w-full text-black bg-transparent leading-tight focus:bg-white focus:outline-none focus:border-[var(--color-primary-100)] dark:text-gray-400 dark:bg-[var(--color-dark-surface-500)] dark:focus:bg-gray-800 dark:text-gray-400 dark:bg-[var(--color-dark-surface-500)] dark:focus:bg-gray-800"
                    id="title"
                    type="text"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-400 text-sm font-bold mb-1"
                    htmlFor="title"
                  >
                    Topic
                  </label>
                  <input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="block py-3 px-4 mb-3 appearance-none border border-[var(--color-primary-500)] rounded w-full text-black bg-transparent leading-tight focus:bg-white focus:outline-none focus:border-[var(--color-primary-100)] dark:text-gray-400 dark:bg-[var(--color-dark-surface-500)] dark:focus:bg-gray-800"
                    id="topic"
                    type="text"
                    required
                  />
                </div>
                <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      className="block text-gray-400 text-sm font-bold mb-2"
                      htmlFor="topic"
                    >
                      Difficulty
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="block py-3 px-4 mb-3 appearance-none border border-[var(--color-primary-500)] rounded w-full text-black bg-transparent leading-tight focus:bg-white focus:outline-none focus:border-[var(--color-primary-100)] dark:text-gray-400 dark:bg-[var(--color-dark-surface-500)] dark:focus:bg-gray-800"
                      id="difficulty"
                      required
                    >
                      <option value="">Select difficulty</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-gray-400 text-sm font-bold mb-2"
                      htmlFor="totalQuestions"
                    >
                      Total Questions
                    </label>
                    <input
                      value={totalQuestions}
                      onChange={(e) => setTotalQuestions(e.target.value)}
                      className="block py-3 px-4 mb-3 appearance-none border border-[var(--color-primary-500)] rounded w-full text-black bg-transparent leading-tight focus:bg-white focus:outline-none focus:border-[var(--color-primary-100)] dark:text-gray-400 dark:bg-[var(--color-dark-surface-500)] dark:focus:bg-gray-800"
                      id="totalQuestions"
                      type="number"
                      placeholder="eg. 5"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-400 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Time per question (in seconds)
                    </label>
                    <input
                      value={timePerQuestion}
                      onChange={(e) => setTimePerQuestion(e.target.value)}
                      className="block py-3 px-4 mb-3 appearance-none border border-[var(--color-primary-500)] rounded w-full text-black bg-transparent leading-tight focus:bg-white focus:outline-none focus:border-[var(--color-primary-100)] dark:text-gray-400 dark:bg-[var(--color-dark-surface-500)] dark:focus:bg-gray-800"
                      id="username"
                      type="number"
                      placeholder="eg. 30"
                      min="10"
                      max="120"
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="p-4 sm:p-8 border-t-2 border-[var(--color-primary-500)] shadow rounded-md bg-[var(--color-surface-mixed-400)] dark:bg-[var(--color-dark-surface-mixed)]">
            <h2 className="text-lg sm:text-2xl mb-4 dark:text-gray-400">Edit Questions</h2>
            {questions.map((question) => {
              return (
                <form
                  key={question.id}
                  onSubmit={handleUpdateQuestion}
                  data-question-id={question.id}
                  data-question-number={question.questionNumber}
                >
                  <div className="border-t-2 border-[var(--color-primary-600)] shadow rounded-md bg-[var(--color-surface-mixed-400)] p-2 sm:p-6 mb-4 dark:bg-[var(--color-dark-surface-mixed)] dark:shadow-gray-700">
                    <div className="mb-4">
                      <label
                        className="block text-gray-500 text-sm font-bold mb-2 dark:text-gray-400"
                        htmlFor="title"
                      >
                        Question {question.questionNumber}:
                      </label>
                      <input
                        onChange={handleChange}
                        defaultValue={question.questionText || ''}
                        name={`question-${question.id}`}
                        className="block py-3 px-4 mb-3 appearance-none border border-[var(--color-primary-500)] rounded w-full text-black bg-transparent leading-tight focus:bg-white focus:outline-none focus:border-[var(--color-primary-100)] dark:text-gray-400 dark:bg-[var(--color-dark-surface-500)] dark:focus:bg-gray-800"
                        id="title"
                        type="text"
                        placeholder={`Type your question ${question.questionNumber + 1}`}
                        required
                      />
                    </div>
                    <label
                      className="block text-gray-500 text-sm font-bold mb-2 dark:text-gray-400"
                      htmlFor="title"
                    >
                      Option:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {question.options.map((option, index) => {
                        return (
                          <div
                            key={`${question.questionNumber}-${index}-${option.optionText}}`}
                          >
                            <input
                              onChange={handleChange}
                              name={`question-${question.id}-option-${option.optionNumber}`}
                              defaultValue={option.optionText}
                              className="block py-3 px-4 mb-3 appearance-none border border-[var(--color-primary-500)] rounded w-full text-black bg-transparent leading-tight focus:bg-white focus:outline-none focus:border-[var(--color-primary-100)] dark:text-gray-400 dark:bg-[var(--color-dark-surface-500)] dark:focus:bg-gray-800"
                              id={question.questionNumber + option.optionText}
                              type="text"
                              placeholder={`Option ${option.optionNumber}`}
                              required
                            />
                          </div>
                        )
                      })}
                    </div>
                    <div className="mt-4 flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <label
                          className="block text-gray-500 text-sm font-bold dark:text-gray-400"
                          htmlFor="title"
                        >
                          Correct Option:
                        </label>
                        <select
                          defaultValue={question.correctOption}
                          onChange={handleChange}
                          name={`question-${question.id}-correct-option`}
                          className="py-2 px-3 border border-[var(--color-primary-500)] rounded text-black bg-transparent leading-tight focus:bg-white focus:outline-none focus:border-[var(--color-primary-100)] dark:text-gray-400 dark:bg-[var(--color-dark-surface-500)] dark:focus:bg-gray-800"
                          required
                        >
                          <option value="">Select</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                        </select>
                      </div>
                      <SubmitButton label="Update" className="w-full sm:w-28" isLoading={questionUpdateLoading === question.id} />
                    </div>
                  </div>
                </form>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default QuizEditPage
