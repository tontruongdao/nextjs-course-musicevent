import cookie from 'cookie'
import { API_URL } from '@/config/index'

export default async (req, res) => {
  if(req.method === 'POST') {

    // Destroy cookie
    res.setHeader(
      'Set-Cookie', 
      cookie.serialize(
        'token', 
        "", { 
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Only https if in production
        expires: new Date(0),
        sameSite: 'strict',
        path: '/'
        }
      )
    )

    res.status(200).json( {message: 'Success'})

    // Sending back a JSON object and status if not a POST request by chaining with '.'
    } else {
      res.setHeader('Allow', ['POST'])
      res.status(405).json({ message: `Method ${req.method} not allowed`})
    }
}