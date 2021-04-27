import React from 'react'
import { useRouter } from 'next/router'

const EventById = () => {

  const router = useRouter()
  console.log(router);

  return (
    <div>
      <h1>Event By Id</h1>
      <button onClick={() => router.push('/')}>Home</button>
    </div>
  )
}

export default EventById
