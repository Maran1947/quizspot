'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/footer/footer'
import Image from 'next/image'
import dashboardScreenshot from '../assets/images/dashboard_quiz_ui.png'

export default function Home() {
  return (
    <div className="w-full bg-gradient-to-t from-[var(--color-primary-300)] to-[var(--color-primary-100)]">
      <header className="flex items-center justify-around px-8 py-3">
        <h1 className="text-white font-bold text-2xl border-x-4 rounded-lg px-2">QuizSpot.ai</h1>
        <div className="rounded-full py-2 px-5  gap-8 bg-white">
          <ul className="flex items-center gap-4 text-black">
            <li className='hover:text-[var(--color-primary-100)]'>Features</li>
            <li className='hover:text-[var(--color-primary-100)]'>About</li>
            <li className='hover:text-[var(--color-primary-100)]'>Contact</li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <Link
            className="text-white border border-white px-6 py-1 rounded-full hover:shadow-[0px_0px_15px_0px_#fff]"
            href="/signin"
            shallow={true}
          >
            Log in
          </Link>
        </div>
      </header>
      <div>
        <div className="h-[300px] sm:h-[500px] flex flex-col justify-center items-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="text-2xl sm:text-4xl xl:text-6xl font-bold text-white text-center"
          >
            AI powered quiz arena
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75 }}
            className="text-md text-center mt-2 sm:text-2xl sm:mt-4 font-light text-white"
          >
            For learners, anytime, anywhere.
          </motion.h2>
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
              transform: 'translateY(100px)'
            }}
            animate={{ opacity: 1, scale: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.75 }}
            className="mt-10"
          >
            <Link
              shallow={false}
              href="/quiz/join"
              className="px-8 py-2 text-md sm:py-3 bg-white hover:shadow-[0px_0px_15px_0px_#fff] text-black rounded-lg sm:text-lg"
            >
              Try It Now
            </Link>
          </motion.div>
        </div>
        <div className="code_editor_img_cover flex justify-center items-center mb-28 sm:mb-40">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="w-[90%] lg:w-auto code_editor_img border border-[#ffffff] rounded-lg p-3 sm:p-5"
          >
            <Image
              width={1200}
              height={1200}
              className="w-full h-auto"
              src={dashboardScreenshot}
              alt="codesocket editor screenshot"
            />
          </motion.div>
        </div>
      </div>
      <div
        id="starIt"
        className="flex flex-col items-center justify-center mb-24 sm:mb-32 gap-2"
      >
        <motion.h2
          initial={{ opacity: 0, transform: 'translateY(100px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.75 }}
          className="text-2xl sm:text-4xl font-bold text-white text-center"
        >
          Enjoying the Project?
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, transform: 'translateY(100px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.75, delay: 0.5 }}
          className="text-sm sm:text-xl text-white text-center"
        >
          If you find it helpful, give it a star on GitHub!
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(100px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.75, delay: 0.5 }}
          className="flex items-center mt-5"
        >
          <a
            href="https://github.com/maran1947/quizspot"
            className="flex items-center w-full px-4 py-2 text-base font-medium text-black bg-[#0bff75] rounded-md hover:bg-[#46db87]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 1792 1792"
            >
              <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path>
            </svg>
            Star it on GitHub!
          </a>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}
