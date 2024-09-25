import mongoose from 'mongoose'

export const connectDB = async () => {
  if (mongoose.connection && mongoose.connections[0].readyState) {
    return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    const dbConnection = mongoose.connection

    dbConnection.on('connected', () => {
      console.log('Mongoose connected to dbConnection successfully!')
    })

    dbConnection.on('error', (error) => {
      console.error('Mongoose connection error:', error)
    })

    dbConnection.on('disconnected', () => {
      console.log('Mongoose connection is disconnected.')
    })
  } catch (error) {
    console.log({ error })
    throw new Error('Error occurred in connecting to db')
  }
}
