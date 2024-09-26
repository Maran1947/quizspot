import React, { Dispatch, SetStateAction } from 'react'

interface GenerateQuizProps {
  generateQuizType: string
  setActiveStep: Dispatch<SetStateAction<number>>
}

const GenerateQuiz = ({ generateQuizType, setActiveStep }: GenerateQuizProps) => {
  console.log({ generateQuizType })
  return (
    <div className="w-full h-[500px] flex flex-col items-center">
      <form className="w-[80%]">
        <div className="text-xl border border-gray-300 py-2 px-6 mb-4">
          Quiz: The Final Destiny
        </div>
        <div className="h-[400px] overflow-y-auto p-6 border border-gray-300">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((question, index) => {
            return (
              <div
                key={question + index}
                className="border border-gray-300 rounded-md p-6 mb-4"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Question {index + 1}:
                  </label>
                  <input
                    value={'What is your purpose in life?'}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Enter your quiz title"
                    required
                  />
                </div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Option:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      value={'Money'}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="title"
                      type="text"
                      placeholder="Enter your quiz title"
                      required
                    />
                  </div>
                  <div>
                    <input
                      value={'Fame'}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="title"
                      type="text"
                      placeholder="Enter your quiz title"
                      required
                    />
                  </div>
                  <div>
                    <input
                      value={'Social Work'}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="title"
                      type="text"
                      placeholder="Enter your quiz title"
                      required
                    />
                  </div>
                  <div>
                    <input
                      value={'Travelling'}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="title"
                      type="text"
                      placeholder="Enter your quiz title"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="title"
                  >
                    Correct Option:
                  </label>
                  <select>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setActiveStep(1)}
            type="button"
            className="text-md outline-none border border-gray-300 w-24 py-1 px-2 shadow hover:bg-black hover:text-white"
          >
            Back
          </button>
          <button
            type="submit"
            className="text-md outline-none border border-gray-300 w-24 py-1 px-2 shadow hover:bg-black hover:text-white"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default GenerateQuiz
