import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState('dark')

  // Handle counter increment
  const handleIncrement = () => {
    setCount((prev) => prev + 1)
  }

  // Handle counter reset
  const handleReset = () => {
    setCount(0)
  }

  // Handle theme toggle
  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={handleIncrement}>
          contador: {count}
        </button>
        <button onClick={handleReset} className="secondary-btn">
          resetar
        </button>
        <button onClick={handleThemeToggle} className="theme-btn">
          tema: {theme}
        </button>
        <p>
          Edite <code>src/App.jsx</code> e salve para testar HMR
        </p>
      </div>

      <p className="read-the-docs">
        Clique nos logos do Vite e React para aprender mais
      </p>
    </>
  )
}

export default App
