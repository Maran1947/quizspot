'use client'
import { useState } from 'react'
import ChooseQuizType from '@/components/quiz/create/chooseQuizType'
import GenerateQuiz from '../_components/generateQuiz'
import Stepper from '../_components/stepper'
import QuizDetails from '../_components/quizDetails'
import QuizCreated from '../_components/quizCreated'
import { IQuizDetailsPayload } from '@/interfaces/payload'

const CreateQuizPage = () => {
  const [generateQuizType, setGenerateQuizType] = useState('')
  const [activeStep, setActiveStep] = useState(0)
  const [quizDetails, setQuizDetails] = useState<IQuizDetailsPayload | null>(null)
  const [quizRoomCode, setQuizRoomCode] = useState<string | null>(null)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white">
      <div className="w-[600px] flex flex-col items-center justify-center gap-12">
        <Stepper activeStep={activeStep} />

        {activeStep === 1 ? (
          <QuizDetails
            setQuizDetails={setQuizDetails}
            setActiveStep={setActiveStep}
          />
        ) : activeStep === 2 ? (
          <GenerateQuiz
            setActiveStep={setActiveStep}
            generateQuizType={generateQuizType}
            quizDetails={quizDetails}
            setQuizRoomCode={setQuizRoomCode}
          />
        ) : activeStep === 3 && quizRoomCode !== null ? (
          <QuizCreated quizRoomCode={quizRoomCode} />
        ) : (
          <ChooseQuizType
            setGenerateQuizType={setGenerateQuizType}
            setActiveStep={setActiveStep}
          />
        )}
      </div>
    </div>
  )
}

export default CreateQuizPage
