import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    question: {
      type: String,
      required: true
    },
    correctOption: {
      type: Number,
      required: true
    },
    options: [
      {
        id: String,
        value: String,
        optionNumber: Number
      }
    ]
  },
  { timestamps: true }
)

export const Question =
  mongoose.models?.Question || mongoose.model('Question', questionSchema)
