'use client'
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

const DashboardPage = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'apexchart-example'
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }
    ]
  })

  useEffect(() => {
    setChartData({
      options: {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        }
      ]
    })
  }, [])

  return (
    <div className="w-full p-8">
      <div>
        <h2 className="text-2xl text-black font-semibold mb-4">Dashboard</h2>
        <div className="flex items-center gap-6">
          <div className="w-[300px] h-[150px] rounded-xl shadow-sm flex flex-col items-center justify-center bg-[#cdc3ff]">
            <h2 className="text-3xl font-semibold">100</h2>
            <p className="text-sm text-gray-600">Total quizzes created</p>
          </div>
          <div className="w-[300px] h-[150px] rounded-xl shadow-sm flex flex-col items-center justify-center bg-[#aac9ff]">
            <h2 className="text-3xl font-semibold">100</h2>
            <p className="text-sm text-gray-600">Total quizzes attended</p>
          </div>
          <div className="w-[300px] h-[150px] rounded-xl shadow-sm flex flex-col items-center justify-center bg-[#92e3b8]">
            <h2 className="text-3xl font-semibold">100</h2>
            <p className="text-sm text-gray-600">Total questions answered</p>
          </div>
          <div className="w-[300px] h-[150px] rounded-xl shadow-sm flex flex-col items-center justify-center bg-[#dd92e4]">
          <h2 className="text-3xl font-semibold">100</h2>
          <p className="text-sm text-gray-600">Total correct answered</p>
          </div>
        </div>
        <div className="mt-8 flex gap-6">
          <div className="w-[60%] flex items-center justify-center rounded-xl bg-[#f9eeff] p-5 shadow-sm">
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="line"
              width={700}
              height={320}
            />
          </div>
          <div className="w-[40%] rounded-xl bg-[#f9eeff] p-6 shadow-sm">
            <h3 className="text-black font-semibold text-xl">
              Recent Activities
            </h3>
            <div className="mt-5">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-[var(--color-primary-100)]"></span>
                <p>Attended Quiz: The Web Series of Web3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
