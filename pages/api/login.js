import { API_URL } from '@/config/index'

export default async (req, res) => {
  if(req.method === 'POST') {
    // Taking Info from FE
    const { identifier, password } = req.body

    console.log(req.body)

    // Sending back a JSON object
    res.status(200).json({})
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed`})
  }
}