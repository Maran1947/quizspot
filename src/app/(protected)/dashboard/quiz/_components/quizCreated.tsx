'use client'
import { useRouter } from "next/navigation"

const QuizCreated = ({ quizRoomCode }: { quizRoomCode: string }) => {
    const router = useRouter()

    const handleViewQuiz = () => {
        router.push(`/dashboard/quiz/${quizRoomCode}/view`)
      }
    
      const handleCopyQuizRoomCode = () => {
        alert(`Quiz room code: ${quizRoomCode}`)
      }

  return (
    <div className="w-[400px] p-8 border border-gray-300 rounded-lg">
      <h2 className="text-2xl text-black text-center my-4">✅ Quiz Created</h2>
      <div className="flex items-center justify-between">
        <button
          className="text-black text-md outline-none border border-gray-300 w-28 py-1 px-2 shadow hover:bg-black hover:text-white"
          onClick={handleViewQuiz}
          type="button"
        >
          View Quiz
        </button>
        <button
          className="text-black text-md outline-none border border-gray-300 w-28 py-1 px-2 shadow hover:bg-black hover:text-white"
          onClick={handleCopyQuizRoomCode}
          type="button"
        >
          Share Code
        </button>
      </div>
    </div>
  )
}

export default QuizCreated
