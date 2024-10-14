'use client'
import Loading from '@/components/loading/loading'
import SkeletonLoading from '@/components/loading/skeletonLoading'
import { IDashboardDetails } from '@/interfaces/dashboardDetails'
import { ApexOptions } from 'apexcharts'
import axios from 'axios'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const DashboardPage = () => {
  const [dashboardDetails, setDashboardDetails] = useState<IDashboardDetails>({
    totalCorrectAnswered: 0,
    totalQuestionsAnswered: 0,
    totalQuizzesAttempted: 0,
    totalQuizzesCreated: 0
  })
  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState<{
    options: ApexOptions
    series: ApexAxisChartSeries
  } | null>()

  const getChartData = async () => {
    try {
      const response = await axios.get('/api/quiz/details/chart')
      if (response.status === 200) {
        const last7Days: {
          date: number
          month: string
          fullDate: string
          totalQuestionsAnswered: number
        }[] = response.data.last7Days
        const dateData = last7Days.map((data) => data.date)
        const questionsAnsweredPerDayData = last7Days.map(
          (data) => data.totalQuestionsAnswered
        )

        setChartData({
          options: {
            chart: {
              id: 'questions-answered',
              zoom: {
                enabled: false
              }
            },
            title: {
              text: 'Questions Answered Per Day',
              align: 'center',
              style: {
                fontSize: window && window.innerWidth > 400 ? '16px' : '12px',
                fontWeight: 'bold',
                color: '#333'
              }
            },
            xaxis: {
              categories: dateData,
              title: {
                text: `Date (${last7Days[0].fullDate} - ${
                  last7Days[last7Days.length - 1].fullDate
                })`,
                style: {
                  fontSize: window && window.innerWidth > 400 ? '14px' : '10px',
                  fontWeight: 'bold'
                }
              },
              labels: {
                rotate: -45
              }
            },
            yaxis: {
              title: {
                text: 'Total Questions Answered',
                style: {
                  fontSize: window && window.innerWidth > 400 ? '14px' : '10px',
                  fontWeight: 'bold'
                }
              },
              min: 0
            },
            tooltip: {
              shared: true,
              intersect: false
            }
          },
          series: [
            {
              name: 'Total Questions Answered',
              data: questionsAnsweredPerDayData
            }
          ]
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  const getDashboardDetails = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/api/quiz/details')
      if (response.status === 200) {
        console.log(response.data)
        setDashboardDetails({
          totalCorrectAnswered: response.data.totalCorrectAnswered,
          totalQuestionsAnswered: response.data.totalQuestionsAnswered,
          totalQuizzesAttempted: response.data.totalQuizzesAttempted,
          totalQuizzesCreated: response.data.totalQuizzesCreated
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDashboardDetails()
    getChartData()
  }, [])

  return (
    <div className="w-full p-4 sm:p-8">
      <div>
        <h2 className="text-2xl text-black font-semibold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            [1, 2, 3, 4].map((index) => <SkeletonLoading key={index} />)
          ) : (
            <>
              <div className="h-[150px] rounded-xl shadow-sm flex flex-col items-center justify-center bg-[#cdc3ff]">
                <h2 className="text-3xl font-semibold">
                  {dashboardDetails.totalQuizzesCreated}
                </h2>
                <p className="text-sm text-gray-600">Total quizzes created</p>
              </div>
              <div className="h-[150px] rounded-xl shadow-sm flex flex-col items-center justify-center bg-[#aac9ff]">
                <h2 className="text-3xl font-semibold">
                  {dashboardDetails.totalQuizzesAttempted}
                </h2>
                <p className="text-sm text-gray-600">Total quizzes attempted</p>
              </div>
              <div className="h-[150px] rounded-xl shadow-sm flex flex-col items-center justify-center bg-[#92e3b8]">
                <h2 className="text-3xl font-semibold">
                  {dashboardDetails.totalQuestionsAnswered}
                </h2>
                <p className="text-sm text-gray-600">
                  Total questions answered
                </p>
              </div>
              <div className="h-[150px] rounded-xl shadow-sm flex flex-col items-center justify-center bg-[#dd92e4]">
                <h2 className="text-3xl font-semibold">
                  {dashboardDetails.totalCorrectAnswered}
                </h2>
                <p className="text-sm text-gray-600">Total correct answered</p>
              </div>
            </>
          )}
        </div>
        <div className="mt-8 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[60%] rounded-xl bg-[#f9eeff] p-5 shadow-sm">
            {chartData && typeof window !== 'undefined' ? (
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="line"
                width="100%"
                height={window && window.innerWidth > 400 ? 320 : 220}
              />
            ) : (
              <Loading
                type="bubbles"
                color="#b390e3"
                width={100}
                height={100}
              />
            )}
          </div>
          <div className="w-full md:w-[40%] flex flex-col gap-2">
            <div className="bg-[#f9eeff] shadow-sm rounded-xl p-6 h-full">
              <h3 className="text-black font-semibold text-xl">
                Recent Activities
              </h3>
              <div className="mt-5">
                <div className="flex items-center gap-2">
                  <span className="inline-block min-w-3 h-3 rounded-full bg-[var(--color-primary-100)]"></span>
                  <p>Attempted Quiz: The Web Series of Web3</p>
                </div>
              </div>
            </div>
            <div className="bg-[#f9eeff] shadow-sm rounded-xl p-6">
              <h3 className="text-black font-semibold text-xl">Jackpot Quiz</h3>
              <h2 className='text-purple-600'>Win big! Coming soon!</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
