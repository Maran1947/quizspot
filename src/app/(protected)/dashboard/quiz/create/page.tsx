'use client'
import { useState } from 'react'
import ChooseQuizType from '@/components/quiz/create/chooseQuizType'
import GenerateQuiz from '../_components/generateQuiz'
import Stepper from '../_components/stepper'
import QuizDetails from '../_components/quizDetails'

const CreateQuizPage = () => {
  const [generateQuizType, setGenerateQuizType] = useState('')
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-[600px] flex flex-col items-center justify-center gap-12">
        <Stepper activeStep={activeStep} />

        {activeStep === 1 ? (
          <QuizDetails setActiveStep={setActiveStep} />
        ) : activeStep === 2 ? (
          <GenerateQuiz
            setActiveStep={setActiveStep}
            generateQuizType={generateQuizType}
          />
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
