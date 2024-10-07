interface IQuizDetailsPayload {
  title: string
  topic: string
  difficulty: string
  totalQuestions: number
  timePerQuestion: number
}

interface IQuizOptionPayload {
  id: string
  optionText: string
  optionNumber: string
}

interface IQuizQuestionPayload {
  questionNumber: number
  questionText: string
  correctOption: string
  options: IQuizOptionPayload[]
}

interface IQuizPayload {
  quizType: string
  quizDetails: IQuizDetailsPayload
  quizQuestions: IQuizQuestionPayload[]
}

interface ISubmissionPayload {
  quizId: string
  questionId: string
  answer: string
}

export type { IQuizDetailsPayload, IQuizQuestionPayload, IQuizPayload, IQuizOptionPayload, ISubmissionPayload }
