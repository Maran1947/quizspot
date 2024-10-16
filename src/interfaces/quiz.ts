interface IQuiz {
  id: string
  title: string
  topic: string
  totalQuestions: number
  timePerQuestion: number
  quizType: string
  roomCode: string
  createdAt: Date
}

interface IOption {
  id: string
  optionText: string
  optionNumber: string
}

interface IQuestion {
  id: string
  quiz: string
  questionNumber: number
  questionText: string
  correctOption: string
  options: IOption[]
}

interface IAttempt {
  id: string
  quizId: string
  result: IQuizResult | null
  quiz?: IQuiz
  createdAt: Date
}

interface IQuizAttemptsGroup {
  quiz: IQuiz,
  attempts: IAttempt[]
}

interface ISubmission {
  id: string
  attemptId: string
  quizId: IQuiz,
  questionId: IQuestion
  answer: string
  question: IQuestion
}

interface IQuizResult {
  accuracy: number
  score: number
  totalScore: number
  totalCorrectAnswers: number
}

export type { IQuiz, IQuestion, IOption, IQuizResult, IAttempt, ISubmission, IQuizAttemptsGroup }
