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
  id: string
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

export type { IQuiz, IQuestion, IOption }
