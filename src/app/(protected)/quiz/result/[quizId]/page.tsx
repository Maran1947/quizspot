'use client'

import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const QuizResultPage = () => {
  const { quizId } = useParams()

  const getUserQuizResult = async () => {
    try {
      const response = await axios.get(`/api/quiz/result/${quizId}`)
      if (response.status === 200) {
        console.log(response.data)
      }
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  useEffect(() => {
    if (quizId) {
      getUserQuizResult()
    }
  }, [])

  return (
    <div className="w-full h-screen bg-[var(--color-surface-mixed-100)]">
        ✅ Your quiz result! 
        {' '}{quizId}
    </div>
  )
}

export default QuizResultPage