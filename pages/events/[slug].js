import { useRouter } from 'next/router'
import Link from 'next/Link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'

import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'

const EventPage = ({ evt }) => {

  const deleteEvent = e => {
    console.log('delete')
  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt/>
            </a>
          </Link>
          <a 
            href='#' 
            className={styles.delete}
            onClick={deleteEvent}>
            <FaTimes/>
            DeleteEvent
          </a>
        </div>

        <span>
          {evt.date} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        
        {evt.image && (
          <div className={styles.image}>
            <Image 
              src={evt.image.formats.medium.url} // modified path in object to match "strapi.io's"
              width={960}
              height={600}/>
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Descriptions</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href='/events'>
          <a className={styles.back}>
            {'<'} Go Back
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export default EventPage

// ########## Fetching Data Method 1
export const getStaticPaths= async() => {

  const res = await fetch(`${API_URL}/events`)
  const events = await res.json()

  const paths = events.map(evt => ({
    params: { slug: evt.slug }
  }))

  return {
    paths,
    fallback: false // Will return 404 if there is no path.
  }
}


export const getStaticProps = async ({ params: { slug } }) => {

  const res = await fetch(`${API_URL}/events?slug=${slug}`)
  const events = await res.json()
  // console.log(events)

  return {
    props: { 
      evt: events[0] ,
      revalidate: 1
    }
  }
}


// ########## Fetching Data Method 2

// export const getServerSideProps = async ({ query: { slug } }) => {

//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const events = await res.json()
//   // console.log(events)

//   return {
//     props: { 
//       evt: events[0] 
//     }
//   }
// }