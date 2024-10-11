interface IQuiz {
  _id: string
  title: string
  topic: string
  totalQuestions: number
  timePerQuestion: number
  quizType: string
  roomCode: string
  createdAt: string
}

interface IOption {
  _id: string
  optionText: string
  optionNumber: string
}

interface IQuestion {
  _id: string
  quiz: string
  questionNumber: number
  questionText: string
  correctOption: string
  options: IOption[]
}

interface ISubmission {
  _id: string
  attemptId: string
  quizId: IQuiz,
  questionId: IQuestion
  answer: string
}

interface IQuizResult {
  accuracy: number
  score: number
  totalScore: number
  totalCorrectAnswers: number
}

export type { IQuiz, IQuestion, IOption, IQuizResult, ISubmission }
