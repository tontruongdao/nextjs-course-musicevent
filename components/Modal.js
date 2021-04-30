import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { FaTimes } from 'react-icons/fa'

import styles from '@/styles/Modal.module.css'


const Modal = ({ show, onClose, children, title }) => {

  
  // ##### React States
  const [ isBrowser, setIsBrowser ] = useState(false)
  
  
  // ##### React useEffect
  useEffect(() => {
    setIsBrowser(true)
  })
  
  
  // ##### Helper Functions
  const handleClose = (e) => {
    e.preventDefault()
    onClose()
  }

// console.log(`The title is ${title} and the children are ${children}`)

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a 
            href='#'
            onClick={handleClose}>
              <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ): null

  if(isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'))
  } else {
    return null
  }
}

export default Modal


// Reference
// https://devrecipes.net/modal-component-with-next-js/