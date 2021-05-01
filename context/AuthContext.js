import React, { useState, useEffect, createContext } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import { API_URL, NEXT_URL } from '@/config/index'

const AuthContext = createContext()



export const AuthProvider = ({ children }) => {
  // ##### React State
  const [ user, setUser ] = useState(null)
  const [ error, setError ] = useState(null)

  // ##### React useEffect
  useEffect(() => error && toast.error(error))


  // ##### Helper Functions
  
  // Register User
  const register = async (user) => {
    console.log(user)
  } 

  // Login User
  // Renames the email to "identifier", to match strappi configuration
  const login = async ({ email:identifier, password }) => { 
    // console.log({ identifier, password})

    // Taking Information from login component, and making a POST req to BE
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier,
        password
      })
    })
    
    // Result from  BE converted to json()
    const data = await res.json()
    console.log(data)

    if(res.ok) {
      setUser(data.user)
    } else {
      setError(data.message)
      setError(null)
    }
    
  }


  // Logout User
  const logout = async () => {
    console.log('Logout')
  }

  // Check if User is Logged In.
  const checkUserLoggedIn = async (user) => {
    console.log('Checked')
  }

  return (
    <AuthContext.Provider 
      value={{ user, error, register, login, logout }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
