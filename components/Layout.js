import Head  from 'next/head'
import { useRouter } from 'next/router'

import Header from './Header'
import Footer from './Footer'
import Showcase from './Showcase'
import styles from '@/styles/Layout.module.css'

const Layout = ({ title, keywords, description, children }) => {
  
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords}/>
      </Head>

      <Header/>
      {router.pathname === '/' && <Showcase/>}
      <div className={styles.container}>
        {children}
      </div>
      <Footer/>
    </div>
  )
}

Layout.defaultProps = {
  title: 'Music Events | Find great events',
  description: "Find your inner self in our events!",
  keywords: "Classic, Electronic"
}

export default Layout
