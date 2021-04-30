import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { FaExclamationCircle, FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '@/components//Layout'
import styles from '@/styles/AuthForm.module.css'

const LoginPage = () => {

  // ##### React States
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')


  // ##### Helper Functions
  const handleSubmit = (e) => {
    e.preventDefault()
    
  }

  return (
    <Layout title='User Login'>
      <div className={styles.auth}>
        <h1>
          <FaUser />
          Login
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input 
              type="email"
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
            <label htmlFor="password">Password</label>              
              <input 
              type="password"
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <input
            className='btn' 
            type="submit" 
            value="Login"/>
        </form>

        <p>
          Don't have an account? 
          <Link href='/account/register'> Register</Link>
        </p>
      </div>
    </Layout>
  )
}

export default LoginPage
