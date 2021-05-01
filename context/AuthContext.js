import React, { useState, useEffect, createContext } from 'react'
import { useRouter } from 'next/router'
import { API_URL } from '@/config/index'

const AuthContext = createContext()



export const AuthProvider = ({ children }) => {
  // ##### React State
  const [ user, setUser ] = useState(null)
  const [ error, setError ] = useState(null)


  // ##### Helper Functions
  
  // Register User
  const register = async (user) => {
    console.log(user)
  } 

  // Login User
  // Renames the email to "identifier", to match strappi configuration
  const login = async ({ email:identifier, password}) => { 
    console.log({ identifier, password})
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
