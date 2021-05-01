import cookie from 'cookie'
import { API_URL } from '@/config/index'

export default async (req, res) => {
  if(req.method === 'POST') {
    // Taking Info from FE
    const { username, email, password } = req.body

    // Fetching from "strapi.io"
    const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })

    const data = await strapiRes.json()
    console.log(data.jwt)

    if(strapiRes.ok) {
      // Set Cookie
      res.setHeader(
        'Set-Cookie', 
        cookie.serialize(
          'token', 
          data.jwt, { 
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development', // Only https if in production
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'strict',
          path: '/'
          }
        )
      )

      res.status(200).json({user: data.user})
    } else {
      res.status(data.statusCode).json({ 
        message: data.message[0].messages[0].message
      })
    }

    // Sending back a JSON object and status if not a POST request by chaining with '.'
    } else {
      res.setHeader('Allow', ['POST'])
      res.status(405).json({ message: `Method ${req.method} not allowed`})
    }
}