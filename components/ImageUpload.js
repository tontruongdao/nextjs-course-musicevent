import React, { useState } from 'react'

import styles from '@/styles/Form.module.css'
import { API_URL } from '@/config/index'
import { FaStaylinked } from 'react-icons/fa'



const ImageUpload = ({ evtId, loadImage }) => {
  
  // ##### React States
  const [ image, setImage ] = useState(null)


  // Helper Functions

  const handleFileChange = (e) => {
    // console.log(e.target.files[0]) // This selects the first file uploaded.
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // JS method to send data from a form.
    const formData = new FormData()
    formData.append('files', image)
    formData.append('ref', 'events')
    formData.append('refId', evtId)
    formData.append('field', 'image')

    // Post request to the BE
    const res = await fetch(`${API_URL}/upload`, { // Strapi uses this URL to Upload Files
      method: 'POST',
      body: formData
    })

    if (res.ok) {
      loadImage()
    }
  }


  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input 
            type='file'
            onChange={handleFileChange}/>
        </div>
        <input 
          type="submit"
          value='Upload'
          className='btn'/>
      </form>
    </div>
  )
}

export default ImageUpload
