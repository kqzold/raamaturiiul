import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 RaamatuRiiul</h1>
        <p>Добро пожаловать в книжный мир!</p>
        <button onClick={() => setCount((count) => count + 1)}>
          Клики: {count}
        </button>
      </header>
    </div>
  )
}

export default App