import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    totalQuestions: {
      type: Number,
      required: true
    },
    timePerQuestion: {
      type: Number,
      required: true
    },
    quizType: {
      type: String,
      required: true
    },
    roomCode: {
      type: String,
      required: true,
      unique: true
    },
    expiredAt: {
      type: Number
    }
  },
  { timestamps: true }
)

export const Quiz = mongoose.models?.Quiz || mongoose.model('Quiz', quizSchema)
