'use client'
import React, { useEffect, useState } from 'react'
import aiLoadingGif from '../../assets/gif/ai_loading_transparent.gif'
import Image from 'next/image'
import Loading from './loading'

const loadingTexts = [
  'Just a moment! Generating exciting questions...',
  'Knowledge is power—unlock yours with every question!',
  'Quizzes are like treasure hunts; every answer is a step closer to victory!',
  "The more you know, the more you grow—let's get quizzing!",
  'Curiosity is the key; let the quiz unlock your potential!',
  'Quiz yourself—because learning never stops!'
]

const AiLoading = () => {
  const [loadingText, setLoadingText] = useState(loadingTexts[0])
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTexts.length)
      setLoadingText(loadingTexts[randomIndex])
    }, 2000)

    return () => clearInterval(intervalId)
  }, [])
  return (
    <div className="flex flex-col items-center justify-center">
      <Loading
        type="bubbles"
        color="var(--color-primary-100)"
        width={60}
        height={30}
      />
      <Image
        src={aiLoadingGif}
        alt="ai chatbot gif"
        width={100}
        height={100}
        style={{ width: 'auto', height: '250px' }}
      />
      <h2 className="text-purple-400">{loadingText}</h2>
    </div>
  )
}

export default AiLoading
