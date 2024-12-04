import { useState } from 'react'
import './App.css'
import Root from './routing/Index'
import { AuthProvider } from './auth/auth'

function App() {
  const [count, setCount] = useState(0)

  return (
      <AuthProvider>
          <Root />
      </AuthProvider>
  )
}

export default App
