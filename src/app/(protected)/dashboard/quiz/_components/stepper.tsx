import React from 'react'
import { FaRegCircleDot } from 'react-icons/fa6'

interface StepperProps {
  activeStep: number
}

const Stepper = ({ activeStep }: StepperProps) => {
  console.log({activeStep})
  return (
    <ol className="w-full flex items-center text-sm font-medium text-center sm:text-base">
      <li className="flex md:w-full items-center text-blue-600  sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10">
        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
          {activeStep === 0 ? (
            <FaRegCircleDot className="me-2" />
          ) : (
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
          )}
          Quiz <span className="hidden sm:inline-flex sm:ms-2">Type</span>
        </span>
      </li>
      <li className={`${activeStep > 0 ? 'text-blue-600' : 'text-gray-500'} flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}>
        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
          {activeStep === 1 ? (
            <FaRegCircleDot className="me-2" />
          ) : activeStep < 1 ? (
            <span className="me-2">2</span>
          ) : (
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
          )}
          Quiz <span className="hidden sm:inline-flex sm:ms-2">Details</span>
        </span>
      </li>
      <li className={`${activeStep > 1 ? 'text-blue-600' : 'text-gray-500'} flex items-center`}>
        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
          {activeStep === 2 ? (
            <FaRegCircleDot className="me-2" />
          ) : activeStep < 2 ? (
            <span className="me-2">3</span>
          ) : (
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
          )}
          Quiz <span className="hidden sm:inline-flex sm:ms-2">Details</span>
        </span>
      </li>
    </ol>
  )
}

export default Stepper
