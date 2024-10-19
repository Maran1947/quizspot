'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import CheckMarkImage from '../../../../../assets/images/green_double_circle_check_mark.jpg'

const QuizCreated = ({ quizRoomCode }: { quizRoomCode: string }) => {
  const router = useRouter()

  const handleViewQuiz = () => {
    router.push(`/dashboard/quiz/${quizRoomCode}/view`)
  }

  const handleCopyQuizRoomCode = () => {
    alert(`Quiz room code: ${quizRoomCode}`)
  }

  return (
    <div className="w-[98%] sm:w-[400px] p-8 bg-[var(--color-primary-500)] border border-[var(--color-primary-100)] rounded-lg dark:bg-purple-900">
      <div className="flex items-center justify-center">
        <Image
          className="rounded-full"
          src={CheckMarkImage}
          width={80}
          height={80}
          alt="check mark icon image"
        />
      </div>
      <h2 className="text-2xl text-[#fff] font-semibold text-center my-4 dark:text-gray-200">
        Your quiz is ready to share!
      </h2>
      <div className="flex items-center justify-between">
        <button
          className="text-white font-semibold text-md outline-none border-2 border-gray-300 w-28 py-1 px-2 shadow hover:bg-black hover:text-white dark:text-gray-200 dark:border-gray-200"
          onClick={handleViewQuiz}
          type="button"
        >
          View Quiz
        </button>
        <button
          className="text-white font-semibold text-md outline-none border-2 border-gray-300 w-28 py-1 px-2 shadow hover:bg-black hover:text-white dark:text-gray-200 dark:border-gray-200"
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
