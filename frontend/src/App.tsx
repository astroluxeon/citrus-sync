import {useState} from 'react'
import './App.css'

function App() {
  const [data, setData] = useState<Record<string, string>>();

  const pingServer = () => {
    fetch('http://localhost:8080/api/ping')
    .then(res => res.json())
    .then(data => setData(data));
  }

  return (
    <>
      <button
        type="button"
        onClick={() => pingServer()}
      >
        Ping Server
      </button>
      <p>{data ? data['message'] : ""}</p>
    </>
  )
}

export default App
