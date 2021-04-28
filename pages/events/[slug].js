import { useRouter } from 'next/router'

import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'

const EventPage = ({ evt }) => {

  const router = useRouter()
  // console.log(router);

  return (
    <Layout>
      <div>
        <h1>{evt.name}</h1>
        <button onClick={() => router.push('/')}>Home</button>
      </div>
    </Layout>
  )
}

export default EventPage


export const getStaticPaths= async() => {

  const res = await fetch(`${API_URL}/api/events`)
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

  const res = await fetch(`${API_URL}/api/events/${slug}`)
  const events = await res.json()
  // console.log(events)

  return {
    props: { 
      evt: events[0] ,
      revalidate: 1
    }
  }
}

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