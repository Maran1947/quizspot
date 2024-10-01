import { IQuizQuestion } from '@/interfaces/quiz'

export const generateQuestionsTemplate = (size: number): IQuizQuestion[] => {
  const quizQuestions = Array.from({ length: size }).map(
    (_, index): IQuizQuestion => {
      return {
        questionNumber: index,
        question: '',
        correctOption: '',
        options: [
          {
            id: `question-${index}-option-a`,
            optionNumber: 0,
            value: ''
          },
          {
            id: `question-${index}-option-b`,
            optionNumber: 1,
            value: ''
          },
          {
            id: `question-${index}-option-c`,
            optionNumber: 2,
            value: ''
          },
          {
            id: `question-${index}-option-d`,
            optionNumber: 3,
            value: ''
          }
        ]
      }
    }
  )

  return quizQuestions
}