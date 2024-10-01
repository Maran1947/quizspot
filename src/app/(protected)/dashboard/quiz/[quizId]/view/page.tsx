'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const QuizViewPage = () => {
  const params = useParams() 
  return (
    <div className="w-full p-8">
      <h2 className="text-xl text-black" >Quiz: </h2>
      <div className='text-2xl text-black' >
        Leaderboard: {params.quizId}
      </div>
    </div>
  )
}

export default QuizViewPage