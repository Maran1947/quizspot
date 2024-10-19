import React from 'react'
import Loading from '../loading/loading'
import { useFormStatus } from 'react-dom'

interface SubmitButtonProps {
  label: string
  className?: string
  isLoading?: boolean
}

const SubmitButton = ({ label, className, isLoading = false }: SubmitButtonProps) => {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={isLoading || pending}
      className={`flex items-center justify-center ${className || 'w-full'} text-white bg-[var(--color-primary-300)] hover:bg-[var(--color-primary-200)] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
    >
      {isLoading || pending ? (
        <Loading type="spin" color="white" width={24} height={24} />
      ) : (
        label
      )}
    </button>
  )
}

export default SubmitButton
