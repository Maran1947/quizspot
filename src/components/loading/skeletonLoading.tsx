import React from 'react'

interface SkeletonLoadingProps {
  width?: string
}

const SkeletonLoading = ({ width = 'max-w-sm' }: SkeletonLoadingProps) => {
  return (
    <div role="status" className={`${width} px-4 py-6 animate-pulse shadow-[0px_1px_10px_0px_#0000001a] bg-[var(--color-surface-mixed-200)] rounded-[15px] dark:bg-[var(--color-dark-surface-mixed)]`}>
      <div className="h-8 bg-gray-300 dark:bg-gray-400 rounded-md max-w-48 mb-4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-400 rounded-md max-w-[360px] mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-400 rounded-md max-w-[360px] mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-400 rounded-md max-w-[360px] mb-3"></div>
      <div className='flex items-center justify-end'>
        <div className="h-6 bg-gray-300 dark:bg-gray-400 rounded-md w-[100px]"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default SkeletonLoading
