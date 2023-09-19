import { NextApiRequest, NextApiResponse } from 'next'

export interface RequestBody {
  email: string
  githubRepoUrl: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // check to see if Post method is used
  if (req.method === 'POST') {
    try {
      // destructure email and githubRepoUrl from request body
      const { email, githubRepoUrl }: RequestBody = req.body

      // check to ensure required values are provided
      if (email === '' || githubRepoUrl === '') {
        return res
          .status(400)
          .json({ error: 'Email and Github Repo Url are both required' })
      }

      const response = await fetch(
        'https://cv-devs-temp-challenge.vercel.app/api/challenge',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, githubRepoUrl })
        }
      )

      // check status of response
      if (response.ok) {
        return res.status(200).json({ message: 'POST request successful' })
      } else {
        return res
          .status(response.status)
          .json({ error: 'POST request failed' })
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    return res.status(405).json({ error: 'Only Post method is allowed' })
  }
}
