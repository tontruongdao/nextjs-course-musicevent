import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaImage } from 'react-icons/fa'
import moment from 'moment'

import ImageUpload from '@/components/ImageUpload'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import styles from '@/styles/Form.module.css'
import { API_URL } from '@/config/index'


const EditEventPage = ( { evt: { 
  name, performers, venue, address, date, 
  time, description, id, image 
} }) => {

  // ##### Component variables

  const router = useRouter()

  // ##### React States
  const [ values, setValues ] = useState({
    name, performers, venue, address,
    date, time, description, image
  })

  const [ imagePreview, setImagePreview ] = useState(
    image ? image.formats.thumbnail.url : null
  )

  const [ showModal, setShowModal ] = useState(false)


  // ##### Helper Functions

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    )

    if(hasEmptyFields) {
      toast.error('Please fill in all fields')
    }


    // PUT Request
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })

    if(!res.ok) {
      toast.error('Something went wront, unable to POST event')
    } else {
      const evt = await res.json()
      router.push(`/events/${evt.slug}`)
    }
  }

  const handleInputChange = (e) => {
    // Using spread operator to update values without overwriting previous values with input
    const { name, value } = e.target
    setValues({ ...values, [name]: value }) 
  }

  const loadImage = async (e) => {
    const res = await fetch(`${API_URL}/events/${id}`)
    const data = await res.json()

    setImagePreview(data.image.formats.thumbnail.url)
    setShowModal(false)
  }


  return (
    <Layout title='Add New Event'>
      <Link href='/events'>Go Back</Link>
      <div>
        <h1>Edit Event</h1>
        <ToastContainer/>

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
                value={moment(values.date).format('yyyy-MM-DD')} // Added moment to format date from BE
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
            value="Update Event" 
            className='btn'/>
        </form>

        <h2>Event Image</h2>
        {imagePreview ? (
          <Image 
            src={imagePreview}
            height={100}
            width={170}/>
          ) : (
            <div>
              <p>No Image Uploaded</p>
            </div>
          )}

          <div>
            <button 
              className='btn-secondary'
              onClick={() => setShowModal(true)}>
              <FaImage /> Set Image
            </button>
          </div>
      </div>

      <Modal 
        show={showModal}
        onClose={() => setShowModal(false)}>
        <ImageUpload 
          evtId={id}
          loadImage={loadImage}/>
      </Modal>
    </Layout>
  )
}

export default EditEventPage


// ##### Server Fetching Functions

export const getServerSideProps = async ( { params: { id } }) => {
  
  const res = await fetch (`${API_URL}/events/${id}`)
  const evt = await res.json()

  return {
    props: {
      evt
    } 
  }
}