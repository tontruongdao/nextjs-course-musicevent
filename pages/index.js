import Layout from '@/components/Layout'
import { API_URL } from "@/config/index"

const HomePage = ({ events }) => {
  
  // console.log(events)

  return (
    <div>
        <Layout>
          <h1>Upcoming Events</h1>
        </Layout>
    </div>
  )
}

export default HomePage


export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  return {
    props: {events},
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

