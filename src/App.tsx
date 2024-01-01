import DataProvider from "./components/context/DataContext"
import MessageProvider from "./components/context/MessageContext"
import Home from "./components/pages/Home"

function App() {
  

  return (
    <DataProvider>
      <MessageProvider>
        <Home/>
      </MessageProvider>
    </DataProvider>
  )
}

export default App
