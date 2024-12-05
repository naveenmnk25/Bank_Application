import { useState } from 'react'
import './App.css'
import Root from './routing/Index'
import { AuthProvider } from './auth/auth'
import { AlertProvider } from './components/contexts/AlertContext'

function App() {
  const [count, setCount] = useState(0)

  return (
      <AuthProvider>
        <AlertProvider>
          <Root />
          </AlertProvider>
      </AuthProvider>
  )
}

export default App
