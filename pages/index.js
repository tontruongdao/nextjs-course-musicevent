import Link from 'next/link'
import Layout from '@/components/Layout'
import { API_URL } from "@/config/index"
import EventItem from '@/components/EventItem'

const HomePage = ({ events }) => {
  
  console.log(events)

  return (
    <div>
        <Layout>
          <h1>Upcoming Events</h1>
          {events.length === 0 && <h3>No Events To Show</h3>}

          {events.map(evt => (
              <EventItem 
                key={evt.id}
                evt={evt}/>
            )
          )}
          {events.length && (
            <Link href='/events'>
              <a className='btn-secondary'>View All Event</a>
            </Link>
          )}
  </Layout>
    </div>
  )
}

export default HomePage


export const getStaticProps = async () => {
  const res = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=3` //Added limit and sort, enabled by "strapi.io"
  )
  
  const events = await res.json()

  return {
    props: { events },
    revalidate: 1
  }
}


// This works as well

// export const getServerSideProps = async () => {
//   const res = await fetch(`${API_URL}/api/events`)
//   const events = await res.json()

//   return {
//     props: {events},
//   }
// }

