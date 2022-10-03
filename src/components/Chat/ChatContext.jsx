import { io } from 'socket.io-client'
import { createContext, useContext, useState } from "react";

const ChatContext = createContext()

export const ChatProvider = ({children}) => {
    const [ socket, setSocket ] = useState(null)

    const values = {
        socket, 
        setSocket
    }

    return <ChatContext.Provider value={values}>
        {children}
    </ChatContext.Provider>
}

export const useChat = () => {
   return  useContext(ChatContext)
}

