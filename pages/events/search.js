import { useRouter } from 'next/router'
import Link from 'next/link'
import qs from 'qs'

import Layout from '@/components/Layout'
import { API_URL } from "@/config/index"
import EventItem from '@/components/EventItem'


const SearchPage = ({ events }) => {
  
  const router = useRouter()

  return (
    <div>
        <Layout title='Search Results'>
          <Link href='/events'>Go Back</Link>
          <h1>Search Result for {router.query.term}</h1>
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

export default SearchPage



//// ###################### Server Side Request

export const getServerSideProps = async ({ query: { term } }) => {

  // Used "qs" package to make a query into 4 properties from events array.
  // Used "_contains" functionality from "strapi.io"
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term }
      ]
    }
  })

  const res = await fetch(
    `${API_URL}/events?${query}`
  )
  const events = await res.json()

  return {
    props: { events: events }
  }
}



