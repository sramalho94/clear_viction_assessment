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
      if (!email || !githubRepoUrl) {
        return res
          .status(400)
          .json({ error: 'Email and Github Repo Url are both required' })
      }
    } catch {}
  }
}
