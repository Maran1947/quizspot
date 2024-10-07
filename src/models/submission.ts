import mongoose from 'mongoose'
import './quiz'
import './question'
import './user'

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export const Submission = mongoose.models?.Submission || mongoose.model('Submission', submissionSchema)
