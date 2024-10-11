import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    questionNumber: {
      type: Number,
      required: true
    },
    questionText: {
      type: String,
      required: true
    },
    correctOption: {
      type: String,
      required: true
    },
    options: [
      {
        id: String,
        optionText: String,
        optionNumber: String
      }
    ]
  },
  { timestamps: true }
)

export const Question =
  mongoose.models?.Question || mongoose.model('Question', questionSchema)
