interface IQuiz {
  id: string
  title: string
  topic: string
  totalQuestions: number
  timePerQuestion: number
  quizType: string
  roomCode: string
  createdAt: string
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

export type { IQuiz, IQuestion, IOption, IQuizResult, ISubmission }
