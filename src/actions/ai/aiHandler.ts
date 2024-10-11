import {
  GoogleGenerativeAI,
  ResponseSchema,
  SchemaType
} from '@google/generative-ai'
import { StringExpression } from 'mongoose'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const responseSchema: ResponseSchema = {
  description: 'List of multiple choice questions',
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      questionNumber: {
        type: SchemaType.STRING,
        description: 'Questions number',
        nullable: false
      },
      questionText: {
        type: SchemaType.STRING,
        description: 'Qusetion text',
        nullable: false
      },
      correctOption: {
        type: SchemaType.STRING,
        description: 'Correct option of the question',
        nullable: false
      },
      options: {
        type: SchemaType.ARRAY,
        description: '4 options of the question',
        items: {
          type: SchemaType.OBJECT,
          properties: {
            optionNumber: {
              type: SchemaType.STRING,
              description: 'The key should be A, B, C, and D.',
              nullable: false
            },
            optionText: {
              type: SchemaType.STRING,
              description: 'The text of the option.',
              nullable: false
            }
          }
        }
      },
    },
    required: ['questionNumber','questionText','correctOption','options']
  },
}

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: {
    responseMimeType: 'application/json',
    responseSchema: responseSchema
  }
})

const generateQuizQuestions = async ({
  topic,
  totalQuestions,
  level
}: {
  topic: string
  totalQuestions: number
  level: StringExpression
}) => {
  const prompt = `Generate multiple-choice questions with four options each based on the details below.

Quiz Details:
Topic: ${topic}
Total Questions: ${totalQuestions}
Difficulty Level: ${level}`

  try {
    const result = await model.generateContent(prompt)
    return JSON.parse(result.response.text())
  } catch (error) {
    console.log(error)
    throw new Error(
      `Error occurred in generating quiz questions from gemini: ${error}`
    )
  }
}

export { generateQuizQuestions }
