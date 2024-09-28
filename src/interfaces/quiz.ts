interface IQuizDetails {
  title: string
  topic: string
  totalQuestions: number
  timePerQuestion: number
}

interface IQuizOption {
  id: string
  value: string
  optionNumber: number
}

interface IQuizQuestion {
  questionNumber: number
  question: string
  correctOption: string
  options: IQuizOption[]
}

interface IQuiz {
  quizType: string
  quizDetails: IQuizDetails
  quizQuestions: IQuizQuestion[]
}

interface ISubmission {
  quizId: string
  questionId: string
  answer: string
}

export type { IQuizDetails, IQuizQuestion, IQuiz, IQuizOption, ISubmission }
