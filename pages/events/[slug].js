import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

const EventById = () => {

  const router = useRouter()
  console.log(router);

  return (
    <Layout>
      <div>
        <h1>Event By Id</h1>
        <button onClick={() => router.push('/')}>Home</button>
      </div>
    </Layout>
  )
}

export default EventById
