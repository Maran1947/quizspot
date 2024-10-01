'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const JoinQuizPage = () => {
  const router = useRouter()
  const [quizRoomCode, setQuizRoomCode] = useState('')

  const handleJoinQuizRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/quiz/room/${quizRoomCode}`)
  }

  return (
    <section className="bg-[var(--color-surface-mixed-100)]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-[var(--color-suface-mixed-200)] rounded-lg shadow-[0px_1px_15px_0px_#0000001a] md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">
              Enter quiz room code to join!
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleJoinQuizRoom}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-500"
                >
                  Quiz room code
                </label>
                <input
                  type="text"
                  name="quizRoomCode"
                  id="text"
                  value={quizRoomCode}
                  onChange={(e) => setQuizRoomCode(e.target.value)}
                  className="bg-[var(--color-surface-mixed-200)] border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[var(--color-primary-300)] hover:bg-[var(--color-primary-200)] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default JoinQuizPage
