import cookie from 'cookie'
import { API_URL } from '@/config/index'

export default async (req, res) => {
  if(req.method === 'GET') {

    // Verifying if cookie is in our browser
    if(!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized'})
      return
    }

    const { token } = cookie.parse(req.headers.cookie)

    // Hitting "strapi.io" to get user information
    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const user = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ user })
    } else {
      res.status(403).json({ message: 'User Forbidden'})
    }


    // Sending back a JSON object and status if not a POST request by chaining with '.'
    } else {
      res.setHeader('Allow', ['GET'])
      res.status(405).json({ message: `Method ${req.method} not allowed`})
    }
}