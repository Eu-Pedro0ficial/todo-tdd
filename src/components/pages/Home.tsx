import { useContext, useState } from "react"
import { Header } from "../Header";
import { MessageContext } from "../context/MessageContext";
import { DataContext } from "../context/DataContext";
import { Form } from "../Form";
import { FlashMessage } from "../FlashMessage";
import List from "../ListComponents/List";

export default function Home() {
  const {setMessage} = useContext(MessageContext);//global
  const {data, setData} = useContext(DataContext);//global

  const [isOpen, setIsOpen] = useState<boolean>(false);//global
  const [inputUpdate, setInputUpdate] = useState<string>("")
  const [oldTask, setOldTask] = useState<string>("");

  function handleDelete(message: string){
    const newData = data.filter((item) => item !== message);
    setData(newData);
  }

  function openUpdateModal(message: string){
    setIsOpen(true);
    setInputUpdate(message);
    setOldTask(message);
  }

  function handleUpdate(){

    if(!inputUpdate){
      setMessage("This field is not send empty");
      return;
    }

    const index = data.indexOf(oldTask);
    data[index] = inputUpdate;
    setData(data);
    setInputUpdate("")
    setIsOpen(false);
  }

  return (
    <div>
      <Header/>
      <main>
        <Form />
        <FlashMessage />
        <section>
          <List.root>
            { data &&(
                data.map(item => (
                  <List.item key={item}>
                    <input type="checkbox" />
                    <p>{item}</p>
                    <List.buttonGroup>
                      <button onClick={() => handleDelete(item)}>Delete</button>
                      <button onClick={() => openUpdateModal(item)}>Update</button>
                    </List.buttonGroup>
                  </List.item>
                ))
              )
            }
          </List.root>
        </section>
        {
          isOpen && (
            <dialog open>
              <input 
                type="text" 
                value={inputUpdate} 
                placeholder="Type your new task" 
                onChange={(e) => setInputUpdate(e.target.value)} 
              />
              <button onClick={() => handleUpdate()}>Update Task</button>
            </dialog>
          )
        }
      </main>
    </div>
  )
}
