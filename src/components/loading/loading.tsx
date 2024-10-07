import React from 'react'
import ReactLoading, { LoadingType } from 'react-loading'

interface LoadingProps {
  type: LoadingType
  color: string
  width: number
  height: number
}

const Loading = ({ type, color, width, height }: LoadingProps) => {
  return (
    <ReactLoading type={type} color={color} width={width} height={height} />
  )
}

export default Loading
