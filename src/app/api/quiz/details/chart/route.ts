import { auth } from '@/auth'
import { prisma } from '@/prismaClient'
import { NextResponse } from 'next/server'

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

export async function GET() {
  try {
    const session = await auth()
    const user = await prisma.user.findUnique({ where: { email: session?.user?.email as string } })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const today = new Date()
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(today.getDate() - 7)

    const last7DaysData = await prisma.attempt.findMany({
      where: {
        userId: user.id,
        createdAt: {
          gte: sevenDaysAgo,
          lt: today
        }
      }
    })

    const resultMap = last7DaysData.reduce((map: { [key: string]: number }, attempt) => {
      console.log(attempt.result)
      const createdAtDate = new Date(attempt.createdAt).toISOString().split('T')[0] // Get YYYY-MM-DD
      const totalQuestionsAnswered = (attempt.result as { totalQuestionsAnswered: number })?.totalQuestionsAnswered || 0

      if (!map[createdAtDate]) {
        map[createdAtDate] = totalQuestionsAnswered
      } else {
        map[createdAtDate] += totalQuestionsAnswered
      }
      return map
    }, {})

    // Create an array of the last 7 days
    const last7Days = []
    for (let i = 6; i >= 0; i--) {
      const day = new Date()
      day.setDate(today.getDate() - i)

      const date = day.getDate() // Get the day of the month (1, 2, 3, etc.)
      const month = day.toLocaleString('en-US', { month: 'long' }) // Get full month name
      const fullDate = formatDate(day) // Format the full date as "DD Month YYYY"
      const isoDate = day.toISOString().split('T')[0] // Used for resultMap lookup (YYYY-MM-DD)

      last7Days.push({
        date: date, // Day of the month (e.g., 1, 2, 3)
        month: month, // Full month name (e.g., "October")
        fullDate: fullDate, // Full formatted date (e.g., "03 October 2024")
        totalQuestionsAnswered: resultMap[isoDate] || 0 // 0 if no data for that day
      })
    }

    return NextResponse.json(
      {
        success: true,
        last7Days
      },
      { status: 200 }
    )
  } catch (error) {
    console.log('Error occurred in get quiz: ', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
