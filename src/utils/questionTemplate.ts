import { IQuizQuestionPayload } from "@/interfaces/payload"


export const generateQuestionsTemplate = (size: number): IQuizQuestionPayload[] => {
  const quizQuestions = Array.from({ length: size }).map(
    (_, index): IQuizQuestionPayload => {
      return {
        questionNumber: index,
        questionText: '',
        correctOption: '',
        options: [
          {
            id: `question-${index}-option-a`,
            optionNumber: 'A',
            optionText: ''
          },
          {
            id: `question-${index}-option-b`,
            optionNumber: 'B',
            optionText: ''
          },
          {
            id: `question-${index}-option-c`,
            optionNumber: 'C',
            optionText: ''
          },
          {
            id: `question-${index}-option-d`,
            optionNumber: 'D',
            optionText: ''
          }
        ]
      }
    }
  )

  return quizQuestions
}