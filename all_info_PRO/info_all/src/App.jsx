import { useState } from 'react'
import AutoBlogger from "./components/AutoBlogger";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AutoBlogger />
      
    </>
    
  )
}

export default App
