import Layout from '@/components/Layout'
import { API_URL, PER_PAGE } from "@/config/index"
import EventItem from '@/components/EventItem'

const EventsPage = ({ events }) => {
  
  // console.log(events)

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
  </Layout>
    </div>
  )
}

export default EventsPage


// export const getStaticProps = async () => {
//   const res = await fetch(`${API_URL}/events?_sort=date:ASC`)
//   const events = await res.json()

//   return {
//     props: { events: events },
//     revalidate: 1
//   }
// }

export const getServerSideProps = async ({ query: { page = 1 } }) => { // Destructure the page from request object & setting default to 1

  // Calculate Start Page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE // Parse into an Integer

  // Fetch total/count of the events in 'strapi.io'
  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()

  // Fetch Events
  const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
  const events = await eventRes.json()

  console.log(total, page)
  return {
    props: { 
      events,
      page: +page,
      total
    }
  }
}


