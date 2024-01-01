import { ReactNode, createContext, useState } from "react";

type MessageContextType = {
  message: string,
  setMessage: (message: string) => void
}

export const MessageContext = createContext({} as MessageContextType);

function MessageProvider({children}:{children: ReactNode}){

  const [message, setMessage] = useState<string>("");

  return (
    <MessageContext.Provider value={{message, setMessage}}>
      {children}
    </MessageContext.Provider>
  )

}

export default MessageProvider;

