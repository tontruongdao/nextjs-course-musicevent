import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'


const AddEventPage = () => {

  // ##### Component variables

  const router = useRouter()

  // ##### React State
  const [ values, setValues ] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: ''
  })


  // ##### Helper Functions

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)
  }

  const handleInputChange = (e) => {
    // Using spread operator to update values without overwriting previous values with input
    const { name, value } = e.target
    setValues({ ...values, [name]: value }) 
  }


  return (
    <Layout title='Add New Event'>
      <Link href='/events'>Go Back</Link>
      <div>
        <h1>Add Event</h1>

        <form 
          onSubmit={handleSubmit}
          className={styles.form}>
          <div className={styles.grid}>
            <div>
              <label htmlFor='name'>Event Name</label>
              <input
                type='text'
                id='name'
                name='name'
                value={values.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='performers'>Performers</label>
              <input
                type='text'
                name='performers'
                id='performers'
                value={values.performers}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='venue'>Venue</label>
              <input
                type='text'
                name='venue'
                id='venue'
                value={values.venue}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='address'>Address</label>
              <input
                type='text'
                name='address'
                id='address'
                value={values.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='date'>Date</label>
              <input
                type='date'
                name='date'
                id='date'
                value={values.date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='time'>Time</label>
              <input
                type='text'
                name='time'
                id='time'
                value={values.time}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor='description'>Event Description</label>
            <textarea
              type='text'
              name='description'
              id='description'
              value={values.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <input 
            type="submit" 
            value="Add Event" 
            className='btn'/>
        </form>
      </div>
    </Layout>
  )
}

export default AddEventPage
