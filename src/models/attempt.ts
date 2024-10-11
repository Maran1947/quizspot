import mongoose from 'mongoose'
import './quiz'
import './user'

const attemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    result: {
        totalQuestionsAnswered: { type: Number },  
        totalCorrectAnswered: { type: Number },
        score: { type: Number },
        accuracy: { type: Number },
        totalScore: { type: Number }
    }
  },
  { timestamps: true }
)

export const Attempt = mongoose.models?.Attempt || mongoose.model('Attempt', attemptSchema)
