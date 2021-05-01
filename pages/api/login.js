import { API_URL } from '@/config/index'

export default async (req, res) => {
  if(req.method === 'POST') {
    // Taking Info from FE
    const { identifier, password } = req.body

    // Fetching from "strapi.io"
    const strapiRes = await fetch(`${API_URL}/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier,
        password
      })
    })

    const data = await strapiRes.json()

    if(strapiRes.ok) {
      // @todo - Set Cookie
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