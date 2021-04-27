import React from 'react'
import Link from 'next/link'
import { FaExclamationTriangle } from 'react-icons/fa'

import Layout from '@/components/Layout'
import styles from '@/styles/404.module.css'

const NotFoundPage = () => {
  return (
    <Layout title='Page Not Found'>
      <div className={styles.error}>
        <h1><FaExclamationTriangle/>404</h1>
        <div>Sorry, there is nothing here</div>
        <Link href='/'>Back To Homepage!</Link>
      </div>
    </Layout>
    
  )
}

export default NotFoundPage
