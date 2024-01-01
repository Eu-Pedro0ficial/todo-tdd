import { FormEvent, useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { MessageContext } from "../context/MessageContext";

export function Form(){
  const [inputValue, setInputValue] = useState<string>();
  const {setMessage} = useContext(MessageContext);
  const {data, setData} = useContext(DataContext);


  function handleSubmit(event: FormEvent){
    event.preventDefault();
  
    if(!inputValue){
      setMessage("The input must not be sent empty");
      return;
    }

    setData([...data, inputValue]);
    setMessage("");
    setInputValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Type your message" 
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  )
}
