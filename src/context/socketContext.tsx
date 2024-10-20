import { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

// interface ISocketContext {}

export const SocketContext = createContext(null)

export const SocketContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isSocketConnected, setIsSocketConnected] = useState(false)

  console.log('isSocketConnected: ', isSocketConnected)

  useEffect(() => {
    const newSocket = io()
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  },[])

  useEffect(() => {
    if (socket === null) return

    if (socket.connected) {
      setIsSocketConnected(true)
    } 

    const onConnect = () => setIsSocketConnected(true)
    const onDisconnect = () => setIsSocketConnected(false)
  
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [socket])
  

  return <SocketContext.Provider value={null}>{children}</SocketContext.Provider>
}

export const useSocket = () => {
  const context = useContext(SocketContext)

  if (context === null) {
    throw new Error('useSocket must be used within a SocketContextProvider')
  }

  return context
}
