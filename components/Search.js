import React, { useState } from 'react'
import { useRouter } from 'next/router'

import styles from '@/styles/Search.module.css'

const Search = () => {
  
  // ##### Components varialbles
  const router = useRouter()

  // ##### React States
  const [ term, setTerm ] = useState('')

  // ##### Helper Functions
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`)
    setTerm('')
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Search Events"
          value={term}
          onChange={(e) => setTerm(e.target.value)}/>
      </form>
      
    </div>
  )
}

export default Search
