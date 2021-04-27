import Layout from '@/components/Layout'
import { API_URL } from "@/config/index"
import EventItem from '@/components/EventItem'

const EventsPage = ({ events }) => {
  
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
  </Layout>
    </div>
  )
}

export default EventsPage


export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  return {
    props: { events: events },
    revalidate: 1
  }
}



