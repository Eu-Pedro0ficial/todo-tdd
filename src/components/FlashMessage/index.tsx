import { useContext } from "react"
import { MessageContext } from "../context/MessageContext"

export function FlashMessage(){
  const {message} = useContext(MessageContext);

  if(!message){
    return <></>
  }

  return (
    <section>
      <p>{message}</p>
    </section>
  )
}
